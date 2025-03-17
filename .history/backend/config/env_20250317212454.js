require('dotenv').config();
module.exports = {
  mongodb: {
    url: process.env.MONGO_URI,
    databaseName: 'man_united',
    options: { useNewUrlParser: true, useUnifiedTopology: true },
  },
  redis: { url: process.env.REDIS_URL },
  port: process.env.PORT || 5000,
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
  migrationsDir: 'migrations',
  changelogCollectionName: 'changelog',
};