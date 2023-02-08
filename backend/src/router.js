const express = require("express");
const scriptfs = require("./scripts/fs");

const router = express.Router();
const { validateUser } = require("./midleware/validator");
const {
  hashPassword,
  verifyPassword,
  verifyToken,
} = require("./midleware/Password");
const usersControllers = require("./controllers/usersControllers");
const rankingControllers = require("./controllers/rankingControllers");
const animeControllers = require("./controllers/animeControllers");

router.use(express.json());
router.get("/test", (req, res) => {
   res.send(`${scriptfs}`);
});
router.post("/readfs", scriptfs.readallfiles);
router.post("/login", usersControllers.login, verifyPassword);
router.post("/register", validateUser, hashPassword, usersControllers.add);
// test update

router.use(verifyToken);
// route api any anime
router.get("/anime", animeControllers.browseAnime);
// ranking crud
router.get("/ranking", rankingControllers.browseRank);
router.post("/ranking/:id", rankingControllers.addRank);
// user crud
router.get("/users", usersControllers.browse);
router.get("/users/:id", usersControllers.read);
router.put("/users/:id", validateUser, hashPassword, usersControllers.edit);
router.delete("/users/:id", usersControllers.destroy);

module.exports = router;
