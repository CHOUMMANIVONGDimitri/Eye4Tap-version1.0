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
// const itemControllers = require("./controllers/itemControllers");

router.use(express.json());
router.post("/readfs", scriptfs.readallfiles);
router.post("/login", usersControllers.login, verifyPassword);
router.post("/register", validateUser, hashPassword, usersControllers.add);
// router.get("/items", itemControllers.browse);
// router.get("/items/:id", itemControllers.read);
// router.put("/items/:id", itemControllers.edit);
// router.post("/items", itemControllers.add);
// router.delete("/items/:id", itemControllers.destroy);
router.use(verifyToken);
router.get("/users", usersControllers.browse);
router.get("/users/:id", usersControllers.read);
router.put("/users/:id", validateUser, hashPassword, usersControllers.edit);
router.delete("/users/:id", usersControllers.destroy);

module.exports = router;
