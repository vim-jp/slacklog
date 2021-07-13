export async function cursor(
  denops: Denops,
  lnum: number,
  col: number,
  off?: number,
): Promise<number>;
export async function cursor(
  denops: Denops,
  list: [lnum: number, col: number, off?: number, curswant?: number],
): Promise<number>;
export async function cursor(
  denops: Denops,
  lnumOrList: number | [
    lnum: number,
    col: number,
    off?: number,
    curswant?: number,
  ],
  col?: number,
  off?: number,
): Promise<number> {
  if (col == undefined) {
    return await denops.call("cursor", lnumOrList) as number;
  } else if (off == undefined) {
    return await denops.call("cursor", lnumOrList, col) as number;
  } else {
    return await denops.call("cursor", lnumOrList, col, off) as number;
  }
}
