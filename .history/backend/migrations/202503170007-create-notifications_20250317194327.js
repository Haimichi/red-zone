module.exports = {
    async up(db) {
      await db.createCollection("notifications");
      await db.collection("notifications").createIndex({ createdAt: -1 });
      // Seeding dữ liệu mẫu
      await db.collection("notifications").insertOne({
        message: "Trận đấu sắp bắt đầu!",
        type: "fixture",
        userId: null, // Thêm sau khi có user
        createdAt: new Date(),
      });
    },
  
    async down(db) {
      await db.collection("notifications").drop();
    },
  };