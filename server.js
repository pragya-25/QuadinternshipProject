const express = require('express');
const axios = require('axios');
const app = express();

// Serve static files (HTML & CSS)
app.use(express.static('public'));

// API route to fetch crypto data
app.get('/api/crypto', async (req, res) => {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
            params: {
                vs_currency: 'usd',
                order: 'market_cap_desc',
                per_page: 10,
                page: 1
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching crypto data', error);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
