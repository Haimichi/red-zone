module.exports = {
    async up(db) {
      await db.createCollection("players");
      await db.collection("players").createIndex({ name: 1 });
      // Seeding dữ liệu mẫu
      await db.collection("players").insertOne({
        name: "Bruno Fernandes",
        position: "Midfielder",
        number: 8,
        stats: { goals: 10, assists: 8, matches: 20 },
        media: [{ type: "image", url: "http://example.com/bruno.jpg" }],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    },
  
    async down(db) {
      await db.collection("players").drop();
    },
  };