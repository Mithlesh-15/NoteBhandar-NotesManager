import express from 'express';
import DBConnect from './utils/DBConnect.js';
import dotenv from 'dotenv';

dotenv.config();
DBConnect();
const app = express();
const port = 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});