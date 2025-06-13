import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';

import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import articleRoutes from './routes/articleRoutes.js';

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

app.use('/api/users', userRoutes);
app.use('/api/articles', articleRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// if (process.env.NODE_ENV === 'production') {
//   const frontendPath = path.join(__dirname, '../robles-front-end/dist'); // papalitan to, galing kay sir
//   app.use(express.static(frontendPath));

//   app.get('*', (req, res) =>
//     res.sendFile(path.join(frontendPath, 'index.html'))
//   );
// }

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);