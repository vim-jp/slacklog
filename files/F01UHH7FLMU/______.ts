import moment from "https://deno.land/x/momentjs/mod.ts";
import { delay } from "https://deno.land/std/async/delay.ts";

type Conversations = {
  channels: Array<Channel>;
  response_metadata: {
    next_cursor: string;
  };
};

type Channel = {
  id: string;
  name: string;
};

type History = {
  messages: Array<Message>;
};

type Message = {
  bot_id?: string;
};

type AggregatedData = {
  id: string;
  name: string;
  messages: Array<Message>;
};

const TOKEN = Deno.env.get("TOKEN");
const POST_CHANNEL = Deno.env.get("POST_CHANNEL");

const DEFAULT_FETCH_OPTIONS = {
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "Authorization": `Bearer ${TOKEN}`,
  },
};

const DEFAULT_CHANNEL_LIST_OPTIONS = [
  "limit=1000",
  "exclude_archived=true",
];

const DEFAULT_HISTORY_OPTIONS = [
  "limit=1000",
];

const MOMENT = moment().utcOffset("+9:00").hour(0).minute(0).second(0);
const LATEST = MOMENT.clone().unix().toString();
const OLDEST = MOMENT.clone().subtract(1, "days").unix().toString();

const fetchChannels = async () => {
  let channels: Array<Channel> = [];
  let nextCursor = undefined;

  while (nextCursor !== "") {
    const urlOptions = [
      ...DEFAULT_CHANNEL_LIST_OPTIONS,
      nextCursor != null ? `cursor=${nextCursor}` : undefined,
    ].filter((v): v is string => v != null).join("&");

    const result = await fetch(
      `https://slack.com/api/conversations.list?${urlOptions}`,
      {
        ...DEFAULT_FETCH_OPTIONS,
      },
    );

    const { channels: fetchChannels, response_metadata: { next_cursor } } =
      (await result.json()) as Conversations;

    channels = [...channels, ...fetchChannels];
    nextCursor = next_cursor;
  }

  return channels;
};

const fetchHistory = async (channel: Channel) => {
  const urlOptions = [
    ...DEFAULT_HISTORY_OPTIONS,
    `channel=${channel.id}`,
    `oldest=${OLDEST}`,
    `latest=${LATEST}`,
  ].join("&");

  const result = await fetch(
    `https://slack.com/api/conversations.history?${urlOptions}`,
    {
      ...DEFAULT_FETCH_OPTIONS,
    },
  );

  const data = (await result.json()) as History;
  const messages = data.messages.filter((message) => message.bot_id == null);

  return {
    messages: messages,
  };
};

const dataToRanking = (data: Array<AggregatedData>) => {
  const message = data
    .sort((a, b) => b.messages.length - a.messages.length)
    .slice(0, 20)
    .map((channel) => `- <#${channel.id}> (${channel.messages.length})`)
    .join("\n");

  return `== ${
    MOMENT.clone().subtract(1, "days").format("YYYY-MM-DD")
  } の発言数ランキング ==\n${message}`;
};

const postMessage = async (message: string) => {
  const body = {
    channel: POST_CHANNEL,
    username: "hot-channel",
    text: message,
  };

  const options = {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Authorization": `Bearer ${TOKEN}`,
    },
  };

  await fetch(`https://slack.com/api/chat.postMessage`, options);
};

const main = async () => {
  const channels = await fetchChannels();
  let data: Array<AggregatedData> = [];

  for (const channel of channels) {
    console.log(`fetch: ${channel.name}`);
    const history = await fetchHistory(channel);
    const aggregated: AggregatedData = {
      id: channel.id,
      name: channel.name,
      ...history,
    };

    data = [...data, aggregated];

    await delay(1500);
  }

  const message = dataToRanking(data);
  console.log(message);
  postMessage(message);
};

main();
