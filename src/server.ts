import sirv from "sirv";
// import express from "express";
import polka from "polka";
import compression from "compression";
import * as sapper from "@sapper/server";
import { config } from "dotenv";
import { createProxyMiddleware } from "http-proxy-middleware";

config();

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

// const app = express();
const app = polka();

app
  .use(
    `/api`,
    createProxyMiddleware({
      target: "https://postl.herokuapp.com",
      changeOrigin: true,
    })
  )
  .use(
    compression({ threshold: 0 }),
    sirv("static", { dev }),
    sapper.middleware()
  )
  .listen(PORT, (err) => {
    if (err) console.log(`Error: ${err}`);
  });
