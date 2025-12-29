import { Client } from "@upstash/qstash";
import dotenv from "dotenv";

dotenv.config();

console.log("🟢 QSTASH TOKEN LOADED:", !!process.env.QSTASH_TOKEN);

const qstashClient = new Client({
  token: process.env.QSTASH_TOKEN,
});

export default qstashClient;
