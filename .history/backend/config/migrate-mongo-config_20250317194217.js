module.exports = {
    async up(db) {
      await db.createCollection("users");
      await db.collection("users").createIndex({ email: 1 }, { unique: true });
      await db.collection("users").createIndex({ username: 1 }, { unique: true });
      // Seeding dữ liệu admin
      await db.collection("users").insertOne({
        username: "admin",
        email: "admin@example.com",
        password: "$2a$10$hashedpasswordhere", // Thay bằng password đã hash (dùng bcrypt)
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    },
  
    async down(db) {
      await db.collection("users").drop();
    },
  };