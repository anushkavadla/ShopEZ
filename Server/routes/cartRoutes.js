const express = require("express");

const {
  createCart,
  getCart,
  updateCart,
  deleteCart,
} = require("../controllers/cartController");

const router = express.Router();

router.post("/", createCart);

router.get("/", getCart);

router.put("/:id", updateCart);

router.delete("/:id", deleteCart);

module.exports = router;