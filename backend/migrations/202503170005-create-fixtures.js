module.exports = {
    async up(db) {
      await db.createCollection("fixtures");
      await db.collection("fixtures").createIndex({ date: 1 });
      // Seeding dữ liệu mẫu
      await db.collection("fixtures").insertOne({
        teams: { home: "Manchester United", away: "Liverpool" },
        date: new Date("2025-03-20T15:00:00Z"),
        location: "Old Trafford",
        competition: "Premier League",
        result: { homeScore: null, awayScore: null, status: "upcoming" },
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    },
  
    async down(db) {
      await db.collection("fixtures").drop();
    },
  };