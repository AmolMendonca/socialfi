// server/src/index.ts

import express, { Request, Response, Router, RequestHandler } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import crypto from 'crypto';
import { Wallet } from 'ethers';
import cors from 'cors';

// Load environment variables
dotenv.config();

const app = express();
const router = express.Router();
const PORT = process.env.PORT || 5000;
const TWITTER_BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;
const SALT = process.env.SALT;

if (!TWITTER_BEARER_TOKEN || !SALT) {
  console.error('Missing environment variables. Please set TWITTER_BEARER_TOKEN and SALT in your .env file.');
  process.exit(1);
}

// Enable CORS for requests coming from your frontend (adjust the origin as needed)
app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);

app.use(express.json());

/**
 * POST /api/createWallet
 * Request Body: { twitterHandle: string }
 */
const createWalletHandler: RequestHandler = async (req, res): Promise<void> => {
  try {
    const { twitterHandle } = req.body;
    if (!twitterHandle) {
      res.status(400).json({ error: 'Twitter handle is required.' });
      return;
    }

    // Call Twitter API to check if the account exists
    const twitterApiUrl = `https://api.twitter.com/2/users/by/username/${twitterHandle}`;
    const twitterResponse = await axios.get(twitterApiUrl, {
      headers: {
        'Authorization': `Bearer ${TWITTER_BEARER_TOKEN}`,
      },
    });

    // If the account does not exist, Twitter returns an error response.
    if (!twitterResponse.data || !twitterResponse.data.data) {
      res.status(404).json({ error: 'Twitter user not found.' });
      return;
    }

    // Deterministically generate a private key using HMAC-SHA256.
    // Here we use the secret SALT as the HMAC key and the twitterHandle as the message.
    const hmac = crypto.createHmac('sha256', SALT);
    hmac.update(twitterHandle);
    const privateKeyHex = hmac.digest('hex');

    // Create a wallet using ethers.js (the private key is only kept in memory)
    const wallet = new Wallet(privateKeyHex);

    // Return the wallet address
    res.json({ address: wallet.address });
    return;
  } catch (error: any) {
    console.error('Error in /api/createWallet:', error.message);
    // Forward 404 errors from Twitter or general errors as appropriate.
    if (error.response && error.response.status === 404) {
      res.status(404).json({ error: 'Twitter user not found.' });
      return;
    }
    res.status(500).json({ error: 'Internal Server Error.' });
    return;
  }
};

router.post('/api/createWallet', createWalletHandler);

app.use(router);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
