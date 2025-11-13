import 'dotenv/config';
import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;   
const GNEWS_API_KEY = process.env.GNEWS_API_KEY;

app.use(cors()); //allow all origins
app.use(express.json());

// Route for crypto news
app.get("/api/crypto-news", async (req, res)=>{
    const apiurl = `https://gnews.io/api/v4/search?q=crypto&lang=en&apikey=${GNEWS_API_KEY}`;

    try {
        const response = await fetch(apiurl);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Error fetching crypto news:", error);
        res.status(500).json({error: "Failed to fetch crypto news"});
    }
});


// Route for social news
app.get("/api/social-news", async (req, res)=>{
    const api_url = `https://gnews.io/api/v4/search?q=social+media&lang=en&max=10&apikey=${GNEWS_API_KEY}&_=${Date.now()}`;

    try {
        const response = await fetch(api_url);
        const data = await response.json();
        res.json(data); 
    } catch (error) {
        console.error("Error fetching social news:", error);
        res.status(500).json({error: "Failed to fetch social news"});
    }
});

// defalut backend message 
app.get("/", (req, res) => {
    res.json({
        status: "ok",
        message: "Welcome to the News Hive API! The server is running correctly."
    });
});

//server port
app.listen(PORT, () => console.log(`Server running on Port${PORT}`));