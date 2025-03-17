const express = require('express');
const router = express.Router();

// Route mẫu
router.get('/', (req, res) => {
  res.send('Auth route');
});

module.exports = router;