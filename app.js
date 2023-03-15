import express from 'express';
import { config } from 'dotenv';

config();

const app = express();

app.use(express.json());
const port = process.env.PORT ?? 3000;

app.get('/api/v1', (req, res) => {
  res.send('Welcome to the event management platform');
});

app.listen(port, () => {
  console.log(`Server running on: http://localhost:${port}`);
});