const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
   console.log('dfgh');
   res.send("Welcome to the")
});

module.exports = router;
