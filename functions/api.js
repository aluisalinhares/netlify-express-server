const express = require("express");
const serverless = require("serverless-http");
const app = express();
const router = express.Router();

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://aluisalinhares.github.io"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  // Allow preflight requests to proceed
  if (req.method === "OPTIONS") {
    console.log("OPTIONS");
    res.status(200).end();
  } else {
    next();
  }
});

router.get("/", (req, res) => {
  res.send("App is running..");
});

router.get("/accesstoken", (req, res) => {
  res.send("Access token get");
});

router.post("/accesstoken", async (req, res) => {
  try {
    const { client_id, client_secret, code } = req.body;
    const response = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          client_id,
          client_secret,
          code,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.text();
    let resJson;
    try {
      resJson = JSON.parse(responseData);
    } catch (parseError) {
      return res.status(500).json({ error: "Internal server error" });
    }

    return resJson.error
      ? res.status(400).json({ error: resJson.error_description })
      : res.status(200).json(resJson);
  } catch (err) {
    console.error("Error fetching access token:", err);
    res.status(500).json({ err: "Internal server error" });
  }
});

router.patch("/gists/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { files } = req.body;

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("token ")) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const accessToken = authHeader.split(" ")[1];
    console.log("accessToken: " + accessToken);
    const response = await fetch(`https://api.github.com/gists/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/vnd.github+json",
        Authorization: `token ${accessToken}`,
      },
      body: JSON.stringify({
        files,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    return res.status(200).json(responseData);
  } catch (err) {
    console.error("Error updating gist:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.use("/.netlify/functions/api", express.json(), router);
module.exports.handler = serverless(app);
