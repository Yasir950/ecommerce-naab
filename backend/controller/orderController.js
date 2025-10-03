import Order from '../models/orderModels.js';
import handleError from '../utils/errorhandler.js';
const getOrders= async (req,res)=>{
    try {
     const orders= await Order.find();
    res.status(201).json(orders)   
    } catch (error) {
    handleError(error,res)  
    }
}
const getOrdersByUserId = async (req, res) => {
  try {
    // either from req.params or req.user (if using JWT authentication)
    const { id } = req.params;  
    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const orders = await Order.find({ user: id }).populate("products.product");

    res.status(200).json(orders);
  } catch (error) {
    handleError(error, res);
  }
};
// ✅ Save a new order
 const saveOrder = async (req, res) => {
  try {
    const { products, user, quantity, price } = req.body;

    // Validate required fields
    if (!products || !user  || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newOrder = new Order({
      products,
      user,
      quantity,
      price,
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({
      message: "Order placed successfully",
      data: savedOrder,
    });
  } catch (error) {
    handleError(error, res)
  }
};

const updateOrder = async (req, res) => {
  try {
    const {id} = req.params;
      const orderExists = await Order.findOne({_id:id})
      if(!orderExists){
        res.status(400).json({ message: "Order not found" })
      }
  
      const updatedOrder= await Order.findByIdAndUpdate(id, req.body, {new:true})
       res.status(201).json({
        message: "Order updated successfully",
        data: updatedOrder,
      });
  } catch (error) {
    handleError(error, res)
  }
}

export {getOrders, saveOrder, updateOrder, getOrdersByUserId}