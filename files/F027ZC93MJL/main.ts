import { Denops } from "https://deno.land/x/denops_std@v1.0.0-beta.0/mod.ts";
import { execute } from "https://deno.land/x/denops_std@v1.0.0-beta.0/helper/mod.ts";

export async function main(denops: Denops): Promise<void> {
  denops.dispatcher = {
    async sleepTest(): Promise<unknown> {
      for (let i = 0; i < 10; i++) {
        Deno.sleepSync(1000);
        console.log(i);
      }
      return await Promise.resolve();
    },
  };

  await execute(
    denops,
    `command! SleepTest call denops#request("${denops.name}", "sleepTest", [])`,
  );
}
