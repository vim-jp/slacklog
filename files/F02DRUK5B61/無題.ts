export const main = async (denops: Denops): Promise<void> => {
  denops.dispatcher = {
    yankWithoutIndent: async (
      line1: unknown,
      line2: unknown,
    ) => {
      ensureNumber(line1);
      ensureNumber(line2);

      const lines = await denops.call("getline", line1, line2);
      ensureArray(lines, isString);

      const leading = Math.min(
        ...lines.map((line) => (line.match(/\S/)?.index)).filter((
          index,
        ): index is number => index != null),
      );

      const p = Deno.run({
        cmd: ["pbcopy"],
        stdin: "piped",
      });
      await p.stdin?.write(
        encode(lines.map((line) => line.slice(leading)).join("\n")),
      );
      p.stdin?.close();
      await p.status();
    },
  };

  await helper.execute(
    denops,
    `
    command! -range=0 YankWithoutIndent call denops#notify('${denops.name}', 'yankWithoutIndent', [<line1>, <line2>])
    xnoremap gy :YankWithoutIndent<CR>
    `,
  );
};
