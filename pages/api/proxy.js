import axios from 'axios';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        const xmlData = req.body;
        const credentials = Buffer.from(`memberapi:Cr1n1t1$`).toString('base64'); 
        const response = await axios.post("https://35.189.50.82:8443/webapi/external/member", xmlData, {
            headers: {
                'Content-Type': 'application/xml',
                'Accept': 'application/xml',
                'Authorization': `Basic ${credentials}`
            },
            httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false })
        });

        res.status(response.status).json(response.data);
    } catch (error) {
        console.error("Proxy Error:", error);
        res.status(error.response?.status || 500).json({ error: "API request failed" });
    }
}
