const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());

const API_KEY = "pub_775000fb830c57a087b517cdfadbe47a2b8db";
const BASE_URL = "https://newsdata.io/api/1/news";

app.get("/news", async (req, res) => {
  try {
    let nextPage = req.query.nextPage || ""; // Fetch next page if available

    let url = `${BASE_URL}?apikey=${API_KEY}&country=in&language=en`;
    if (nextPage) {
      url += `&page=${nextPage}`;
    }

    console.log("Fetching news from:", url);
    const response = await axios.get(url);

    res.json({
      articles: response.data.results || [],
      nextPage: response.data.nextPage || null, // Send nextPage token
    });
  } catch (error) {
    console.error("Error fetching news:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});
