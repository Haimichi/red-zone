const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('News route');
});

module.exports = router;