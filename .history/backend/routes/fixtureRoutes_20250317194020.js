const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Fixtures route');
});

module.exports = router;