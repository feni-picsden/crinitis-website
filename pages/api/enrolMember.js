import jwt from 'jsonwebtoken';
import axios from 'axios';

const PASSKIT_KEY = process.env.PASSKIT_USERNAME;     
const PASSKIT_SECRET = process.env.PASSKIT_PASSWORD; 

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
    const apiKey = PASSKIT_KEY;     
    const apiSecret = PASSKIT_SECRET; 
    const payload = {
      uid: apiKey,
      exp: Math.floor(Date.now() / 1000) + 3600
  };

  const token = jwt.sign(payload, apiSecret, { algorithm: 'HS256' });

  const passkitApiUrl = 'https://api.pub1.passkit.io/members/member';
  const { programId, tierId, externalId, person } = req.body;

  const memberData = {
      programId,
      tierId,
      externalId,
      person
  };
  try {
      const response = await axios.post(passkitApiUrl, memberData, {
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
          }
      });

      res.status(200).json(response.data); 
  } catch (error) {
      res.status(500).json({ error: 'Enrollment failed', details: error.response?.data || error.message });
  }
}
