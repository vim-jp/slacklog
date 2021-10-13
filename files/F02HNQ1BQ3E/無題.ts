import { CompleteResult, ExtensionContext, sources, workspace } from 'coc.nvim';

export type Candidate = {
  word: string;
  abbr?: string;
  menu?: string;
  info?: string;
  kind?: string;
  dup?: boolean;
  user_data?: unknown;
  __sourceName: string;
};

export const activate = async (context: ExtensionContext): Promise<void> => {
  context.subscriptions.push(
    sources.createSource({
      name: 'ddc',
      doComplete: async () => {
        const items = await getCompletionItems();
        return { ...items };
      },
    })
  );
};

const getCompletionItems = async (): Promise<CompleteResult> => {
  const candidates = (await workspace.nvim.getVar('ddc#_candidates')) as Array<Candidate>;
  return {
    items: candidates.map((item) => {
      return {
        ...item,
        menu: `[${['ddc', item.__sourceName].join(' ')}]`,
      };
    }),
  };
};
