import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";

const isProd = process.env.ARCJET_ENV === "production";

const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    shield({ mode: isProd ? "LIVE" : "DRY_RUN" }),

    detectBot({
      mode: isProd ? "LIVE" : "DRY_RUN",
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),

    tokenBucket({
      mode: isProd ? "LIVE" : "DRY_RUN",
      refillRate: 5,
      interval: 10,
      capacity: 10,
    }),
  ],
});

export default aj;
