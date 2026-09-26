import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// performative-ui is consumed as a normal npm dependency (0.7.0), so the repo
// builds standalone with no sibling clone.
//
// base is "/" because this is a user site: the repo is tidarsentausa.github.io,
// served from the domain root. A project repo would need "/<repo>/" instead.
export default defineConfig({
  base: "/",
  plugins: [react()],
});
