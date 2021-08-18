import { execSync } from 'child_process';

import { commands, CompleteResult, ExtensionContext, sources, window, workspace } from 'coc.nvim';

export const activate = async (context: ExtensionContext): Promise<void> => {
  window.showMessage(`coc-npm-version-complete works!`);

  context.subscriptions.push(
    commands.registerCommand('coc-npm-version-complete.Command', async () => {
      window.showMessage(`coc-npm-version-complete Commands works!`);
    }),

    sources.createSource({
      name: 'coc-npm-version-complete completion source',
      doComplete: async () => {
        const items = await getCompletionItems();
        return items;
      },
    })
  );
};

const getCompletionItems = async (): Promise<CompleteResult> => {
  const fileName = await workspace.nvim.call('expand', ['%:t']);
  if (fileName !== 'package.json') {
    return { items: [] };
  }

  const state = await workspace.getCurrentState();

  const text = state.document.getText();
  const json = JSON.parse(text);
  const dependencies = Object.keys(json.dependencies ?? {});
  const devDependencies = Object.keys(json.devDependencies ?? {});

  const currentLine = await workspace.nvim.line;
  const match = /^\s*"(?<packageName>\S+)":\s"\S+",?$/.exec(currentLine);
  const packageName = match?.groups?.packageName;

  if (packageName == null) {
    return { items: [] };
  }

  if (![...dependencies, ...devDependencies].includes(packageName)) {
    return { items: [] };
  }

  const stdout = execSync(`yarn --silent info --json ${packageName}`, { encoding: 'utf-8' });
  const versions = JSON.parse(stdout).data.versions as Array<string>;

  return {
    items: [
      ...versions.map((version) => ({
        word: version,
        menu: '[npm-version]',
      })),
    ],
  };
};
