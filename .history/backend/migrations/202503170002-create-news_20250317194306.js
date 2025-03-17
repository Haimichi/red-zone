module.exports = {
    async up(db) {
      await db.createCollection("news");
      await db.collection("news").createIndex({ category: 1 });
      await db.collection("news").createIndex({ createdAt: -1 });
      // Seeding dữ liệu mẫu
      await db.collection("news").insertOne({
        title: "Manchester United thắng đậm",
        content: "Đội bóng đã giành chiến thắng 3-0 trước đối thủ.",
        category: "team",
        image: "http://example.com/image.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    },
  
    async down(db) {
      await db.collection("news").drop();
    },
  };