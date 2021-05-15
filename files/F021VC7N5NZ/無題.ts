import { readAll } from "https://deno.land/std@0.96.0/io/mod.ts";

const conn = await Deno.connect(
  <Deno.UnixConnectOptions> { transport: "unix", path: "/var/run/docker.sock" },
);

const enc = new TextEncoder();
const req = "GET /images/json HTTP/1.1\r\nHost: 1.41\r\n\r\n\r\n";
conn.write(enc.encode(req)).then(() => {
  readAll(conn).then((resp) => {
    console.log(new TextDecoder().decode(resp).toString());
  })
}).catch((err) => {
  console.log("error", err);
});
