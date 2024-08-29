import { afterAll, beforeAll, describe, expect, test } from "bun:test";

import type { Server } from "bun";

describe("Bun server", () => {
  let server: Server;

  beforeAll(async () => {
    server = Bun.serve({
      async fetch(req) {
        const path = new URL(req.url).pathname;

        if (path === "/") {
          return new Response("Welcome to Bun!");
        }

        return new Response("Not Found!", { status: 404 });
      },
    });
  });

  afterAll(() => {
    server.stop();
  });

  test("should return 'Welcome to Bun!' for the root path", async () => {
    const request = new Request("http://localhost:3000/");
    const response = await fetch(request);
    const message = await response.text();
    expect(response.status).toBe(200);
    expect(message).toBe("Welcome to Bun!");
  });

  test("should return 'Not found' for a non-existent path", async () => {
    const request = new Request("http://localhost:3000/non-existent");
    const response = await fetch(request);
    const message = await response.text();
    expect(response.status).toBe(404);
    expect(message).toBe("Not Found!");
  });
});
