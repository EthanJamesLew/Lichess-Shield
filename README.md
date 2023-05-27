# Lichess Shield Service

Welcome to the Lichess Shield Service! This application allows you to fetch the ELO rating for a specified user and game format from Lichess and display it in the form of a badge. It's perfect for showing off your Lichess skills on your GitHub profile, blog, or personal website!

## Service Overview

This service accepts a HTTP GET request with two parameters:

- A Lichess username
- A game format (bullet, blitz, rapid, etc.)

It then fetches the relevant data from Lichess and generates an SVG shield that displays the user's ELO rating for the specified game format. You can then embed this shield wherever you'd like to display the rating.

## Running the Service Locally

To run the service locally, follow these steps:

1. Ensure Node.js and npm are installed on your system. If not, download them from the [official website](https://nodejs.org/).
2. Clone this repository to your local machine.
3. Navigate to the root directory of the project in your terminal.
4. Run `npm install` to install the necessary dependencies.
5. Run `vercel dev` to start the local development server.
6. Navigate to `http://localhost:3000/api?username=<Lichess username>&format=<game format>` in your web browser to fetch and display the rating shield.

Remember to replace `<Lichess username>` and `<game format>` with the Lichess username and the game format you're interested in, respectively.

## Example Query

```
shellCopy code
http://localhost:3000/api?username=Trollfish-Bot&format=rapid
```

This example query will fetch the rapid ELO rating for the user "Trollfish-Bot" from Lichess and generate an SVG shield displaying the rating.

Happy coding, and may your ELO always be rising!

------

Oh, and before you go, here's a little programming joke for you:

Why don't programmers like nature?

It has too many bugs. 🐞😄
