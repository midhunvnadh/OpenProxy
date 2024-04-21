import { time } from "console";

const fs = require("fs");
const axios = require("axios");
const { SocksProxyAgent } = require("socks-proxy-agent");
const HttpsProxyAgent = require("https-proxy-agent");

var url = "https://google.com/";

export default async function downloadFileWithProxy(proxyUrl) {
  let agent;
  if (proxyUrl.startsWith("socks")) {
    agent = new SocksProxyAgent(proxyUrl);
  } else if (proxyUrl.startsWith("http")) {
    agent = new HttpsProxyAgent(proxyUrl);
  } else {
    throw new Error("Invalid proxy URL");
  }

  return new Promise(async (resolve, reject) => {
    setTimeout(() => {
      reject("Timeout!");
    }, 6500);

    let response = null,
      start = Date.now();

    try {
      response = await axios({
        method: "GET",
        url: url,
        httpAgent: agent,
        httpsAgent: agent,
      });
    } catch (e) {
      reject(e);
    }

    if (response === null) {
      return;
    }

    const end = Date.now();
    const responseTime = end - start;

    resolve({ responseTime });
  });
}
