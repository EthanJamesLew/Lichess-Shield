// Import the required libraries
const express = require('express');
const axios = require('axios');

// Initialize an Express application
const app = express();

// lichess logo
const base64lichess = 'PHN2ZyB2aWV3Qm94PSItMC42OTIgMC41IDUxLjU3MyA1NS4yODUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjIzODUiIGhlaWdodD0iMjUwMCI+PHBhdGggZD0iTTM4Ljk1Ni41Yy0zLjUzLjQxOC02LjQ1Mi45MDItOS4yODYgMi45ODRDNS41MzQgMS43ODYtLjY5MiAxOC41MzMuNjggMjkuMzY0IDMuNDkzIDUwLjIxNCAzMS45MTggNTUuNzg1IDQxLjMyOSA0MS43Yy03LjQ0NCA3LjY5Ni0xOS4yNzYgOC43NTItMjguMzIzIDMuMDg0Uy0uNTA2IDI3LjM5MiA0LjY4MyAxNy41NjdDOS44NzMgNy43NDIgMTguOTk2IDQuNTM1IDI5LjAzIDYuNDA1YzIuNDMtMS40MTggNS4yMjUtMy4yMiA3LjY1NS0zLjE4N2wtMS42OTQgNC44NiAxMi43NTIgMjEuMzdjLS40MzkgNS42NTQtNS40NTkgNi4xMTItNS40NTkgNi4xMTItLjU3NC0xLjQ3LTEuNjM0LTIuOTQyLTQuODQyLTYuMDM2LTMuMjA3LTMuMDk0LTE3LjQ2NS0xMC4xNzctMTUuNzg4LTE2LjIwNy0yLjAwMSA2Ljk2NyAxMC4zMTEgMTQuMTUyIDE0LjA0IDE3LjY2MyAzLjczIDMuNTEgNS40MjYgNi4wNCA1Ljc5NSA2Ljc1NiAwIDAgOS4zOTItMi41MDQgNy44MzgtOC45MjdMMzcuNCA3LjE3MXoiIHN0cm9rZT0iI2ZmZiIgZmlsbD0iI2ZmZiIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPgo=';

// Set up a route for GET requests
app.get('/api', async (req, res) => {

    // Retrieve the username, format, and logo flag from the query parameters
    const { username, format, logo = 'true', text = 'true' } = req.query;

    // Capitalize the format
    const capitalizedFormat = format.charAt(0).toUpperCase() + format.slice(1);

    // Call the Lichess API to retrieve the user's ratings
    let user;
    try {
        const response = await axios.get(`https://lichess.org/api/user/${username}`);
        user = response.data;
    } catch (error) {
        // If the Lichess API call fails, return an error response
        return res.status(500).send('Error fetching data from Lichess API');
    }

    // Extract the desired rating from the user's ratings
    const rating = user.perfs[format].rating;

    // lichess text
    const lichessText = text == 'true' ? 'Lichess%20': '';

    // Create the URL for the shields.io API to generate the shield
    const shieldUrl = logo === 'true' ?
        `https://img.shields.io/badge/${lichessText}${capitalizedFormat}-${rating}-blue?logo=data:image/svg+xml;base64,${base64lichess}` :
        `https://img.shields.io/badge/${lichessText}${capitalizedFormat}-${rating}-blue`;

    // Call the shields.io API to retrieve the shield SVG
    let svg;
    try {
        const response = await axios.get(shieldUrl);
        svg = response.data;
    } catch (error) {
        // If the shields.io API call fails, return an error response
        return res.status(500).send('Error fetching shield from Shields.io');
    }

    // Return the shield SVG with the appropriate content type
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(svg);
});

// Export the app as a Vercel Serverless Function
module.exports = app;

