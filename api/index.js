// Import the required libraries
const express = require('express');
const axios = require('axios');

// Initialize an Express application
const app = express();

// Set up a route for GET requests
app.get('/', async (req, res) => {

    // Retrieve the username and format from the query parameters
    const { username, format } = req.query;

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

    // Create the URL for the shields.io API to generate the shield
    const shieldUrl = `https://img.shields.io/badge/Lichess%20${capitalizedFormat}-${rating}-blue`;

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

