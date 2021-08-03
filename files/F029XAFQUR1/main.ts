import { Denops } from "https://deno.land/x/denops_std@v1.0.0/mod.ts";
import * as anonymous from "https://deno.land/x/denops_std@v1.0.0/anonymous/mod.ts";
import * as helper from "https://deno.land/x/denops_std@v1.0.0/helper/mod.ts";

export async function defineKeymap(denops: Denops, modes: string[], name: string, fn: () => Promise<unknown>) {
  const id = anonymous.add(denops, fn)[0];
  await helper.batch(denops, (helper) => {
    for(const mode of modes) {
      helper.cmd(`${mode}noremap <Plug>(${name}) <Cmd>call denops#notify('${denops.name}', '${id}', [])<CR>`);
    }
  });
}

// Export `main` function which is executed from denops.vim
export async function main(denops: Denops) {
  await defineKeymap(denops, ["n"], "hoge", async () => {
    await denops.cmd("echo 'hoge'");
  });
  await denops.cmd('nmap Q <Plug>(hoge)');
}