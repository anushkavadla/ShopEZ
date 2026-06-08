const Order = require("../models/Order");

// CREATE ORDER
const createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// GET ALL ORDERS
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// UPDATE ORDER
const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.json(order);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// DELETE ORDER
const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);

    res.json({
      message: "Order deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getOrders,
  updateOrder,
  deleteOrder,
};