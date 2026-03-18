import { createServer } from "@modelcontextprotocol/sdk";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const server = createServer({
  tools: {
    test: {
      description: "Test MCP connection",
      parameters: {},
      execute: async () => {
        return { message: "MCP is working 🚀" };
      }
    }
  }
});

server.listen(3000, () => {
  console.log("MCP Server running on port 3000");
});