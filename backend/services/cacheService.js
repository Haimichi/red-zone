const redisClient = require('../config/redis');

/**
 * Lấy dữ liệu từ cache hoặc database
 * @param {string} key - Cache key
 * @param {Function} fetchData - Hàm lấy dữ liệu từ database
 * @param {number} ttl - Thời gian cache (giây)
 */
exports.getCachedData = async (key, fetchData, ttl = 3600) => {
  try {
    if (!redisClient.isReady) {
      return await fetchData();
    }

    // Kiểm tra dữ liệu trong cache
    const cachedData = await redisClient.get(key);
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    // Không có trong cache, lấy từ database
    const data = await fetchData();
    
    // Lưu vào cache
    await redisClient.setEx(key, ttl, JSON.stringify(data));
    
    return data;
  } catch (error) {
    console.error('Cache error:', error);
    // Nếu lỗi cache, vẫn lấy dữ liệu từ database
    return await fetchData();
  }
};

/**
 * Xóa cache theo pattern
 * @param {string} pattern - Pattern của key cần xóa
 */
exports.invalidateCache = async (pattern) => {
  try {
    if (!redisClient.isReady) return;

    // Nếu là key cụ thể
    if (!pattern.includes('*')) {
      await redisClient.del(pattern);
      return;
    }
    
    // Nếu cần xóa theo pattern, sử dụng SCAN
    let cursor = '0';
    do {
      const reply = await redisClient.scan(cursor, {
        MATCH: pattern,
        COUNT: 100
      });
      
      cursor = reply.cursor;
      const keys = reply.keys;
      
      if (keys.length) {
        await redisClient.del(keys);
      }
    } while (cursor !== '0');
  } catch (error) {
    console.error('Cache invalidation error:', error);
  }
};