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
    const api_url = `https://gnews.io/api/v4/search?q=social%20media&lang=en&max=10&apikey=${GNEWS_API_KEY}&_=${new Date().getTime()}`;

    try {
        const response = await fetch(api_url);
        const data = await response.json();
        res.json(data); 
    } catch (error) {
        console.error("Error fetching social news:", error);
        res.status(500).json({error: "Failed to fetch social news"});
    }
});



app.get("/api/image-proxy", async (req, res) => {
    try {
        const imageUrl = req.query.url;
        if (!imageUrl) {
            return res.status(400).json({ error: "Image URL is required" });
        }

        const response = await fetch(imageUrl);

        // Check if the fetch was successful
        if (!response.ok) {
            return res.status(response.status).json({ error: "Failed to fetch image" });
        }

        // Forward the image content and content type to the client
        const imageBuffer = await response.buffer();
        const contentType = response.headers.get('content-type');

        res.set('Content-Type', contentType);
        res.send(imageBuffer);

    } catch (error) {
        console.error("Image proxy error:", error);
        res.status(500).json({ error: "Failed to proxy image" });
    }
});


app.get("/", (req, res) => {
    res.json({
        status: "ok",
        message: "Welcome to the News Hive API! The server is running correctly."
    });
});

//server port
app.listen(PORT, () => console.log(`Server running on Port${PORT}`));