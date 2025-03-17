/**
 * Middleware kiểm tra quyền người dùng
 * @param {Array} roles - Mảng các vai trò được phép truy cập
 */
module.exports = (roles = []) => {
    if (typeof roles === 'string') {
      roles = [roles];
    }
  
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({ message: 'Chưa xác thực người dùng' });
      }
  
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({ 
          message: 'Bạn không có quyền thực hiện thao tác này' 
        });
      }
  
      next();
    };
  };