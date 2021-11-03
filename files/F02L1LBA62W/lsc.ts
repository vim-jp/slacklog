import {
  BufReader,
  BufWriter,
} from "https://deno.land/std@0.113.0/io/buffer.ts";

type LS = {
  p: Deno.Process;
  r: BufReader;
  w: BufWriter;
};

const p = Deno.run({
  cmd: ["deno", "lsp"],
  stdin: "piped",
  stdout: "piped",
});

const ls: LS = {
  p,
  r: new BufReader(p.stdout),
  w: new BufWriter(p.stdin),
};

let count = 1;

async function send(ls: LS, data: string) {
  console.log(data);
  const packet = new TextEncoder().encode(
    `Content-Length: ${data.length}\r\nContent-Type: application/vscode-jsonrpc-harset=utf-8\r\n\r\n${data}`,
  );
  await ls.w.write(packet);
  await ls.w.flush();
}

async function sendRequest(
  ls: LS,
  method: string,
  msg: unknown,
): Promise<number> {
  const id = count++;
  const data = JSON.stringify({
    jsonrpc: "2.0",
    id,
    method,
    params: msg,
  });
  await send(ls, data);
  return id;
}

async function sendResponse(ls: LS, id: number, result: unknown) {
  const data = JSON.stringify({
    jsonrpc: "2.0",
    id,
    result,
  });
  await send(ls, data);
}

async function recv(ls: LS) {
  let len = -1;
  while (true) {
    const str = await ls.r.readString("\r");
    if (str === null || await ls.r.readByte() !== 0x0a) {
      throw Error("Illegal header detected");
    }
    if (str === "\r") {
      break;
    }
    const m = str.match(/Content-Length: (\d+)/);
    if (m) {
      len = parseInt(m[1]);
    }
  }
  const buf = new Uint8Array(len);
  await ls.r.readFull(buf);
  return new TextDecoder().decode(buf);
}

// ここからプロトコルを喋っていく

// initializeリクエストを投げる
// 中身は適当でよい
await sendRequest(ls, "initialize", {
  capabilities: {},
  initializationOptions: {
    "enable": true,
  },
});

// initializeのレスポンスを受け取る
console.log(await recv(ls));

// initializeレスポンスを受け取ったらinitializedリクエストを投げる
// これは通知なのでレスポンスは無い
await sendRequest(ls, "initialized", {});

// ドキュメントを適当に開く
await sendRequest(ls, "textDocument/didOpen", {
  textDocument: {
    uri: "file:///tmp/a.ts",
    languageId: "typescript",
    version: 1,
    text: "Deno.\n",
  },
});

// receive workspace/configuration for didOpen
const wc = JSON.parse(await recv(ls));
console.log("wc", wc);
// 適当にレスポンスを返しておく
await sendResponse(ls, wc.id, wc.params.items.map(() => null));

// textDocument/publishDiagnostics ignore
console.log(await recv(ls));

// 補完をリクエスト
const cid = await sendRequest(ls, "textDocument/completion", {
  textDocument: {
    uri: "file:///tmp/a.ts",
  },
  position: {
    line: 0,
    character: 5,
  },
});

while (true) {
  const res = JSON.parse(await recv(ls));
  if (res.id === cid) {
    console.log(res);
    break;
  }
}

console.log(await recv(ls));

await ls.p.status();