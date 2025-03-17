require('dotenv').config();
module.exports = {
    mongodb: {
      url: process.env.MONGO_URI,
      databaseName: "man_united",
      options: { useNewUrlParser: true, useUnifiedTopology: true },
    },
    migrationsDir: "migrations",
    changelogCollectionName: "changelog",
  };