require('dotenv').config(); // Thêm dòng này để load .env
module.exports = {
    mongodb: {
      url: process.env.MONGO_URI,
      databaseName: "man_united",
      options: { useNewUrlParser: true, useUnifiedTopology: true },
    },
    migrationsDir: "migrations",
    changelogCollectionName: "changelog",
  };