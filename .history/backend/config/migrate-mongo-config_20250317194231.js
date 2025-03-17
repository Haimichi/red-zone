module.exports = {
    mongodb: {
      url: process.env.MONGO_URI,
      databaseName: "manchester_united",
      options: { useNewUrlParser: true, useUnifiedTopology: true },
    },
    migrationsDir: "migrations",
    changelogCollectionName: "changelog",
  };