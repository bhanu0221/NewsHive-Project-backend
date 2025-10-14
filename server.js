import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = 5000;    

app.use(cors()); //allow all origins
app.use(express.json());

// Route for Crypto Prices
app.get("/api/crypto-prices", async (req, res)=>{
    try {
        const url ="https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,dogecoin";
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({error: "Failed to fetch crypto data"});
    }
});

// Route for crypto news
app.get("/api/crypto-news", async (req, res)=>{
    const apikey = "dd6eb8e9e237a44ad748939cc2f01d49";
    const apiurl = `https://gnews.io/api/v4/search?q=crypto&lang=en&token=${apikey}`;

    try {
        const response = await fetch(apiurl);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({error: "Failed to fetch crypto news"});
    }
});


// Route for social news
app.get("/api/social-news", async (req, res)=>{
    const api_key = "dd6eb8e9e237a44ad748939cc2f01d49";
    const api_url = `https://gnews.io/api/v4/search?q=social media&lang=en&max=10&apikey=${api_key}&_=${new Date().getTime()}`;

    try {
        const response = await fetch(api_url);
        const data = await response.json();
        res.json(data); 
    } catch (error) {
        res.status(500).json({error: "Failed to fetch social news"});
    }
});

//server port
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));