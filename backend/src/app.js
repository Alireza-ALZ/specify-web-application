const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const dotenv = require('dotenv');

dotenv.config();

const { connectDB } = require('./db');
const sessionMiddleware = require('./middleware/session');

const authRoutes = require('./routes/auth');
const formRoutes = require('./routes/form');

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(sessionMiddleware);

app.use('/api/auth', authRoutes);
app.use('/api/form', formRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/index.html'));
});

app.use((err, req, res, next) => {
  console.error(err && err.stack ? err.stack : err);
  res.status(500).json({ error: 'internal_error' });
});

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  connectDB(process.env.MONGODB_URI)
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
      });
    })
    .catch((err) => {
      console.error('Failed to connect to DB', err);
      process.exit(1);
    });
}

module.exports = app;
