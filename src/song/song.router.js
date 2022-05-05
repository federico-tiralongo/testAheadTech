const { Router } = require("express");
const songController = require("./song.controller");

const router = Router();

router
  .route("/csv")
  .get(songController.get)
  .post(songController.create);

module.exports = router;