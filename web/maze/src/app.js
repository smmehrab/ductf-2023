const express = require('express');
const path = require('path');

const app = express();
const port = 5000;

const FLAG_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiRkxBRyI6ImR1Q1RGezRuZF8xX2NoMCQzX3RoM18wbjNfbDMkJF90cjR2M2xsM2RfYnl9IiwiaWF0IjoxNTE2MjM5MDIyfQ.xNRsptwgz_qRn7uSFx7xQcdTLpSz51eTfJF7cwjKut8';

// Middleware to check if the path matches the specified maze path
const mazeMiddleware = (req, res, next) => {
    const requestedPath = req.path.substring(1); // Remove the leading slash
    const targetPath1 = 'L/R/R/L/R/L/R/R/R/L/L/R/L/L/R/L/R/R/L/R/R/L/L/L/L/R/R/L/L/L/R/R/L/R/L/R/L/';
    const targetPath2 = 'L/R/R/L/R/L/R/R/R/L/L/R/L/L/R/L/R/R/L/R/R/L/L/L/L/R/R/L/L/L/R/R/L/R/L/R/L';

    if (requestedPath === targetPath1 || requestedPath === targetPath2) {
        const htmlResponse = `
        <html>
            <head>
                <title>Path Explored</title>
            </head>
            <body style="padding: 100px; box-sizing: border-box;">
                <span style="text-align: center;">
                    <span style="text-align: center;">Thank you for your patience.</span>
                    <span style="text-align: center;">Looks like we will need more of it.</span>
                    <span style="text-align: center;">${FLAG_JWT}</span>
                    <span style="text-align: center;">Ring a bell?</span>
                </span>
            </body>
        </html>
    `;

        res.send(htmlResponse);
    } else {
        next(); // Continue to the next middleware or route
    }
};

// Middleware to serve the index.html for any path
app.use(express.static('public'));

// Middleware to handle the specified maze path
app.use(mazeMiddleware);

// Middleware to serve index.html for any other paths
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
