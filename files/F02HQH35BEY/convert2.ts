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

async function encodeTOML(dic: D, path: string) {
  const output: string[][] = [];
  for (const [kana, cands] of dic) {
    for (const c of cands) {
      output.push([
        [`[[${kana}]]`],
        c[1] ? [`description = ${JSON.stringify(c[1])}`] : [],
        [`target = ${JSON.stringify(c[0])}`],
        [""],
      ].flat());
    }
  }
  await Deno.writeTextFile(path, output.flat().join("\n"));
}

async function encode(dic: SKKDic) {
  await encodeTOML(dic.okuriari, "./okuriari.toml");
  await encodeTOML(dic.okurinasi, "./okurinasi.toml");
}

const data = await Deno.readFile("/usr/share/skk/SKK-JISYO.L");
const dic = decodeSKK(new TextDecoder("euc-jp").decode(data));
await encode(dic);