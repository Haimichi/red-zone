module.exports = {
    async up(db) {
      await db.createCollection("staff");
      await db.collection("staff").createIndex({ role: 1 });
      // Seeding dữ liệu mẫu
      await db.collection("staff").insertOne({
        name: "Erik ten Hag",
        role: "Manager",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    },
  
    async down(db) {
      await db.collection("staff").drop();
    },
  };