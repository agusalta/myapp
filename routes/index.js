const express = require('express');
const path = require('path');
const router = express.Router();
const app = express();  

app.use(express.static(path.join(__dirname, '../client/public')));

router.get('*', (req, res) => {
  const indexPath = path.join(__dirname, '../client/public/index.html');
  res.sendFile(indexPath);
});

module.exports = router;
