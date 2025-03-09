import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    customerName: {
        type: String,
        required: true
    },
    customerEmail: {
        type: String,
        required: false
    },
    tableNo: {
        type: String,
        required: true
    },
    items: [{
        name: String,
        price: Number,
        quantity: Number
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ['cashOnDelivery', 'onlinePayment'],
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
    orderStatus: {
        type: String,
        enum: ['placed', 'preparing', 'ready', 'served', 'cancelled'],
        default: 'placed'
    }
}, {
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

export default Order; 