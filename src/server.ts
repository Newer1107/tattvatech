import serverEntry from "@tanstack/react-start/server-entry";

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      return await serverEntry.fetch(request, env, ctx);
    } catch (error) {
      console.error("SSR Error:", error);
      return new Response(
        "<!DOCTYPE html><html><body><h1>Server Error</h1><p>Something went wrong. Please try again.</p></body></html>",
        {
          status: 500,
          headers: { "content-type": "text/html; charset=utf-8" },
        },
      );
    }
  },
};
