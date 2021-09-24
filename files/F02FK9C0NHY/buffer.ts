import { Denops } from "https://deno.land/x/denops_std@v1.11.3/mod.ts";
import * as autocmd from "https://deno.land/x/denops_std@v1.11.3/autocmd/mod.ts";

export default class Buffer {
  denops: Denops
  bufnr: number
  buf: string[] = []
  constructor(denops: Denops, bufnr: number) {
    this.denops = denops
    this.bufnr = bufnr
  }
  async init() {
    this.buf = await this.denops.call('getbufline', this.bufnr, 1, "$") as string[]
    this.denops.dispatch
    await autocmd.group(this.denops, `${this.denops.name}-${this.bufnr}`, (helper) => {
      ["TextChanged", "TextChangedI", "TextChangedP"],
        "<buffer>",
        `call denops#notify("${denops.name}", "preview_reflash", [])`,
        // ↑ここにcallbackを登録したい
    })
  }
  callback() {
    this.buf = await denops.call('getbufline', bufnr, 1, "$") as string[]
  }
  getlines(): string[] {
    return this.buf
  }
}
