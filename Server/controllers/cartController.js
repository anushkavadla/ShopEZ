const Cart = require("../models/Cart");

// CREATE CART
const createCart = async (req, res) => {
  try {
    const cart = await Cart.create(req.body);

    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// GET ALL CARTS
const getCart = async (req, res) => {
  try {
    const carts = await Cart.find();

    res.json(carts);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// UPDATE CART
const updateCart = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(cart);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// DELETE CART
const deleteCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);

    res.json({
      message: "Cart deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  createCart,
  getCart,
  updateCart,
  deleteCart,
};