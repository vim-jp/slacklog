const renderIndent = async (denops: Denops, lines: ReadonlyArray<Line>) => {
  await Promise.all(extmarkIds.map(async (id) => {
    if (id != null) {
      denops.call("nvim_buf_del_extmark", 0, await getNamespace(denops), id);
    }
  }));
  extmarkIds = [];

  const indentWidth = await getIndentWidth(denops);

  Promise.all(
    lines.map(async ({ indent }, i) => {
      if (indent <= 1) {
        return;
      }

      const lineNumber = startLine + i - 1;
      const virtText = ` ${
        `${" ".repeat(indentWidth - 1)}|`.repeat(indent - 1)
      }`;

      return await denops.call(
        "nvim_buf_set_extmark",
        0,
        await getNamespace(denops),
        lineNumber,
        0,
        {
          virt_text: [[virtText, "LineNr"]],
          virt_text_pos: "overlay",
          hl_mode: "combine",
        },
      ) as number;
    }),
  ).then((result) => {
    extmarkIds = result;
  });
};
