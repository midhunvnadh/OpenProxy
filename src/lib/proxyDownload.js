const axios = require("axios");
const { SocksProxyAgent } = require("socks-proxy-agent");
const HttpsProxyAgent = require("https-proxy-agent");

var url = "https://api.my-ip.io/v2/ip.txt";

async function downloadFileWithProxy(proxyUrl) {
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
    }, 7000);

    let response = null,
      start = Date.now();

    try {
      response = await axios({
        method: "GET",
        url: `${url}`,
        httpAgent: agent,
        httpsAgent: agent,
      });
    } catch (e) {
      reject(e);
    }

    if (response === null || response.status !== 200) {
      reject("Invalid response");
      return;
    }

    const { data } = response;

    const country = data.split("\n")[2];
    console.log(country || "No country found!!!");
    const responseTime = Date.now() - start;

    resolve({ responseTime, country });
  });
}

module.exports = downloadFileWithProxy;
