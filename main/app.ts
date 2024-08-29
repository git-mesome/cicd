const server = Bun.serve({
  port: 4000,
  async fetch(req) {
    const path = new URL(req.url).pathname;

    if (path === "/") {
      return new Response("Welcome to MISNEO!!!!");
    }

    return new Response("Not Found!", { status: 404 });
  },
});

console.info(`Listening on ${server.url}`);
