const lineRegexp = /^(\S+) \/(.*)\/$/;

type D = [string, string[][]][];

type SKKDic = {
  okuriari: D;
  okurinasi: D;
};

function decodeSKK(data: string): SKKDic {
  const lines = data.split("\n");
  const okuriari: D = [];
  const okurinasi: D = [];

  for (const l of lines) {
    const m = l.match(lineRegexp);
    if (m) {
      const chars = Array.from(m[1]);
      const isAbbrev = chars.every((c) => c.charCodeAt(0) < 127);
      const isOkuriari = chars.at(-1)!.match(/[a-z]/);
      if (!isAbbrev && isOkuriari) {
        okuriari.push([m[1], m[2].split("/").map(c => c.split(";"))]);
      } else {
        okurinasi.push([m[1], m[2].split("/").map(c => c.split(";"))]);
      }
    }
  }

  okuriari.sort((a, b) => a[0].localeCompare(b[0]));
  okurinasi.sort((a, b) => a[0].localeCompare(b[0]));

  return {
    okuriari,
    okurinasi,
  };
}

function encodeTOML(dic: SKKDic) {
  const lines: string[] = [];
  lines.push("[okuriari]");
  for (const [kana, cands] of dic.okuriari) {
    lines.push(`"${kana}" = ${JSON.stringify(cands)}`);
  }
  lines.push("");
  lines.push("[okurinasi]");
  for (const [kana, cands] of dic.okurinasi) {
    lines.push(`"${kana}" = ${JSON.stringify(cands)}`);
  }
  return lines.join("\n");
}

const data = await Deno.readFile("/usr/share/skk/SKK-JISYO.L");
const dic = decodeSKK(new TextDecoder("euc-jp").decode(data));
await Deno.writeTextFile("./l.toml", encodeTOML(dic));