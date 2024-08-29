const server = Bun.serve({
  async fetch(req) {
    const path = new URL(req.url).pathname;

    if (path === "/") {
      return new Response("Welcome to Bun!");
    }

    return new Response("Not Found!", { status: 404 });
  },
});

console.info(`Listening on ${server.url}`);
