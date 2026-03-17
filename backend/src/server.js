require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`\n🚀  Geeta Portal API running on port ${PORT} [${process.env.NODE_ENV}]`);
    console.log(`   Health: http://localhost:${PORT}/api/health\n`);
  });
};

startServer();
