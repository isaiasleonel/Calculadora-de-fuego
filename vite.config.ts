import path from "path";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");
  return {
    define: {
      "process.env.API_KEY": JSON.stringify(env.GEMINI_API_KEY),
      "process.env.GEMINI_API_KEY": JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
      },
    },
    server: {
      host: "0.0.0.0",
      port: 5173,
      // allowedHosts: [
      //   'eeb4b162-dc88-4652-968d-a7e195493e43-00-23yomms3q8rd7.janeway.replit.dev',
      //   '.replit.dev',
      //   'localhost'
      // ]
    },
  };
});
