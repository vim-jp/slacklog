import { Denops } from "https://deno.land/x/denops_std@v1.0.0-beta.8/mod.ts";
import { execute } from "https://deno.land/x/denops_std@v1.0.0-beta.8/helper/mod.ts";

// Export `main` function which is executed from denops.vim
export async function main(denops: Denops) {
  denops.dispatcher = {
    async say(): Promise<void> {
      await denops.eval("input('test')");
    },
    async ho(): Promise<string> {
      return "hoge";
    }
  };

  // Use 'execute()' to execute multiline Vim script
  await execute(
    denops,
    `
    command! Test call denops#request("${denops.name}", "say", [])
    cnoremap <expr> Q denops#request("${denops.name}", "ho", [])
    `,
  );
}