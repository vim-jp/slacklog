import { Denops } from "https://deno.land/x/denops_std@v1.9.0/mod.ts";

export async function main(d: Denops): Promise<void> {
  d.dispatcher = {
    async test1(): Promise<void> {
      await d.cmd(`edit /`)
    },
    async test2(): Promise<void> {
      await d.cmd(`edit .`)
    }
  }
  await d.cmd('autocmd BufEnter * echomsg "test"')
  await d.cmd('command! Test1 call denops#request("denops-test", "test1", [])')
  await d.cmd('command! Test2 call denops#request("denops-test", "test2", [])')
}
