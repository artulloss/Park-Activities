require("dotenv").config();
const express = require("express");
const fs = require("fs");
const path = require("path");
const PORT = 8000;

const root_url = "https://developer.nps.gov/api/v1";
const api_key = process.env.API_KEY;

// Removes the /rest+* from the url
function cleanURL(url) {
	url = url.replace("/rest", "");
	// Remove any // from the url
	url = url.replace(/\/\//g, "/");
	// Fix https://
	url = url.replace("https:/", "https://");
	return url;
}

async function createServer(
  root = process.cwd(),
  isProd = process.env.NODE_ENV === "production"
) {
  const resolve = (p) => path.resolve(__dirname, p);

  const app = express();

  app.get("/rest/+*", async (req, res) => {
    // res.json({ message: 'Hello from server!' });
	let url = cleanURL(root_url + req.url);
	// If it doesn't have any query parameters, add the api key with a question mark
	if (url.indexOf("?") === -1) {
		url += "?api_key=" + api_key;
	} else { // Otherwise, add the api key with an ampersand
		url += "&api_key=" + api_key;
	}
	// console.log(url);
	const response = await fetch(url);
	try {
		const data = await response.json();
		res.json(data);
	} catch (_) {
		res.sendFile(__dirname + '/api-error.html');
	}
  });

  /**
   * @type {import('vite').ViteDevServer}
   */
  let vite;
  if (isProd) {
    app.use(express.static(resolve("./dist")));
  } else {
    vite = await require("vite").createServer({
      root,
      logLevel: "info",
      server: {
        middlewareMode: true,
        watch: {
          // During tests we edit the files too fast and sometimes chokidar
          // misses change events, so enforce polling for consistency
          usePolling: true,
          interval: 100,
        },
      },
    });
    // use vite's connect instance as middleware
    app.use(vite.middlewares);
  }

  app.use("/", async (req, res) => {
    const url = req.originalUrl;

    const template = fs.readFileSync(
      resolve(isProd ? "./dist/index.html" : "./index.html"),
      "utf-8"
    );

    res.status(200).set({ "Content-Type": "text/html" }).end(template);
  });

  return { app, vite };
}

createServer().then(({ app }) => {
  app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
  });
});

// for test use
exports.createServer = createServer;
