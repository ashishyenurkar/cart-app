import Order from "../model/orderModel.js";

export const placeOrder = async (req, res) => {
    try {
        const { shippingInfo, orderItems, paymentInfo, totalPrice, orderStatus } = req.body;
        const user = req.user;

        const newOrder = new Order({
            shippingInfo,
            orderItems,
            user: user._id,
            paymentInfo,
            totalPrice,
            orderStatus
        });

        // Save the order to the database
        const savedOrder = await newOrder.save();

        res.status(201).json({ success: true, savedOrder }); // Respond with the created order
    } catch (error) {
        res.status(500).json({ success: false, error: error.message }); // Internal server error if something goes wrong
    }
};

export const getUserOrders = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming req.user contains the user information
        const orders = await Order.find({ user: userId }); // Find orders with the user ID
        
        res.status(200).json({ success: true, orders }); // Respond with the orders found for the user
    } catch (error) {
        res.status(500).json({ success: false, error: error.message }); // Internal server error if something goes wrong
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find(); // Retrieve all orders
        
        res.status(200).json({ success: true, orders }); // Respond with all orders
    } catch (error) {
        res.status(500).json({ success: false, error: error.message }); // Internal server error if something goes wrong
    }
};
