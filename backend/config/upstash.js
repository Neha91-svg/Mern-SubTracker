import { Client } from "@upstash/qstash";
import dotenv from "dotenv";

dotenv.config();

const qstashClient = new Client({
  token: process.env.QSTASH_TOKEN,
});

export default qstashClient;
