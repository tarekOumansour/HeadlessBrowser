const express = require("express");
const puppeteer = require('puppeteer');
const app = express();

app.get("/", (req, res) => {
    res.status(200).send("Home Page");
});

app.get("/about", (req, res) => {
    res.status(200).send("About Page");
});

app.get('/execute', async (req, res) => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://tarek.kesug.com/sendImage.php');
        
        await browser.close();

        res.send('Puppeteer script executed successfully!');
    } catch (error) {
        console.error('Error executing Puppeteer script:', error);
        res.status(500).send('Internal Server Error');
    }
});

const port = 8000;
app.listen(port, () => {
    console.log(`Site is running on port ${port}`);
});
