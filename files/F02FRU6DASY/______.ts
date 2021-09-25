import { Denops } from "https://deno.land/x/denops_std@v2.0.0/mod.ts";
import * as autocmd from "https://deno.land/x/denops_std@v2.0.0/autocmd/mod.ts";
import * as anonymous from "https://deno.land/x/denops_std@v2.0.0/anonymous/mod.ts";

export default class Buffer {
  private denops: Denops;
  private bufnr: number;
  private buf: string[] = [];

  private onTextChanged: ((buffer: Buffer) => void) | null;

  constructor(
    denops: Denops,
    bufnr: number,
    onTextChanged: ((buffer: Buffer) => void) | null,
  ) {
    this.denops = denops;
    this.bufnr = bufnr;

    this.onTextChanged = onTextChanged;

    this.init();
  }
  private async init() {
    this.buf = await this.denops.call(
      "getbufline",
      this.bufnr,
      1,
      "$",
    ) as string[];
    this.denops.dispatch;

    // textchanged callback
    const id = anonymous.add(this.denops, async () => {
      this.buf = await this.denops.call(
        "getbufline",
        this.bufnr,
        1,
        "$",
      ) as string[];
      if (this.onTextChanged == null) {
        return;
      }
      this.onTextChanged(this);
    })[0];
    await autocmd.group(
      this.denops,
      `${this.denops.name}-${this.bufnr}`,
      (helper) => {
        helper.define(
          ["TextChanged", "TextChangedI", "TextChangedP"],
          "<buffer>",
          `call denops#notify("${this.denops.name}", "${id}", [])`,
        );
      },
    );
  }
  get lines(): string[] {
    return this.buf;
  }
}
