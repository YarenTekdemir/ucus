const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());

app.get('/api/flights', async (req, res) => {
  try {
    const response = await axios.get('https://api.schiphol.nl/public-flights/flights', {
      headers: {
        'Accept': 'application/json',
        'app_id': '0a8fa62b', // Buraya API ID'nizi koyun
        'app_key': '324378601a62b0140b3c04b76288bb2f', // Buraya API Key'inizi koyun
        'ResourceVersion': 'v4'
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching flights:', error.message);
    res.status(500).json({ error: 'Error fetching flights' });
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
