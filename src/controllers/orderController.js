import Order from '../models/Order.js';
import sendEmail from '../utils/sendEmail.js';

// Create new order
export const createOrder = async (req, res) => {
    try {
        const {
            customerName,
            customerEmail,
            tableNo,
            items,
            totalAmount,
            paymentMethod,
            paymentStatus
        } = req.body;

        const newOrder = new Order({
            orderId: "ORD" + Math.floor(100000 + Math.random() * 900000),
            customerName,
            customerEmail,
            tableNo,
            items,
            totalAmount,
            paymentMethod,
            paymentStatus
        });

        await newOrder.save();

        // Send email receipt if email is provided
        if (customerEmail) {
            const emailContent = `
                Dear ${customerName},
                
                Thank you for your order at FoodCrafters!
                
                Order Details:
                Order ID: ${newOrder.orderId}
                Table No: ${tableNo}
                Total Amount: $${totalAmount}
                Payment Method: ${paymentMethod}
                
                Your order will be served shortly.
                
                Best regards,
                FoodCrafters Team
            `;

            await sendEmail({
                to: customerEmail,
                subject: `Order Confirmation - ${newOrder.orderId}`,
                text: emailContent
            });
        }

        res.status(201).json({
            success: true,
            order: newOrder
        });
    } catch (error) {
        console.error('Order creation error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create order',
            error: error.message
        });
    }
};

// Get order by ID
export const getOrder = async (req, res) => {
    try {
        const order = await Order.findOne({ orderId: req.params.orderId });
        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }
        res.json({
            success: true,
            order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch order',
            error: error.message
        });
    }
};

// Update payment status
export const updatePaymentStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { paymentStatus } = req.body;

        const order = await Order.findOneAndUpdate(
            { orderId },
            { paymentStatus },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        res.json({
            success: true,
            order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update payment status',
            error: error.message
        });
    }
}; 