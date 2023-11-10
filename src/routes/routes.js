const express = require("express");
const UserController = require('../../controllers/UserController.js')
const router = express.Router();

router.get("/", (req, res) => {
  res.send("server iniciado");
});

router.post('/migrar', UserController.migrar)

module.exports = router;
