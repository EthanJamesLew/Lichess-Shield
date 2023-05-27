const express = require('express');
const axios = require('axios');
const app = express();

async function getRating(username, format) {
  const url = `https://lichess.org/api/user/${username}`;
  const response = await axios.get(url);
  return response.data.perfs[format].rating;
}

app.get('/api', async (req, res) => {
  const { username, format } = req.query;

  if (!username || !format) {
    res.send("Invalid request. You need to provide a Lichess username and format.");
    return;
  }

  try {
    const rating = await getRating(username, format);
    const badgeUrl = `https://img.shields.io/badge/Lichess%20${format}-${rating}-blue.svg`;
    const svgResponse = await axios.get(badgeUrl, { responseType: 'arraybuffer' });

    res.setHeader('Cache-Control', 'no-store, must-revalidate');
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(svgResponse.data);
  } catch (e) {
    res.send(e.message);
  }
});

module.exports = app;

