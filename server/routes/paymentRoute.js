const express = require('express');
const { route } = require('./userAuthentication');
const Razorpay  = require('razorpay');


const router = express.Router();

router.post("/orders", async (req, res) => {
    try {
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET,
        });

        const options = {
            amount: 50000, // amount in smallest currency unit
            currency: "INR",
            receipt: "receipt_order_74394",
        };

        const order = await instance.orders.create(options);

        res.json(order);

        
        if (!order) return res.status(500).send("Some error occured");

    } catch (error) {
        res.status(500).send(error);
    }
});

router.get("/payment/:oaymentId" , async (req , res)=>{
    const {paymentId} = req.params
    const razorpay = new Razorpay({
        key_id: 'rzp_test_MwnG1vTygvVlbg',
        key_secret: 'vR6jre45J6KdV1Xi683B4PAB'
    })

    try{
        const payment = await razorpay.payments.fetch(paymentId)
        res.status(200).json(payment)

        if(!payment){
            return res.status(404).json("Payment Not Found")
        }

        res.json({
            status:payment,
            method:payment.method,
            amount: payment.amount,
            currency: payment.currency
        })
    }catch(err){
        res.status(500).json("Internal Server Error")
    }
})

module.exports = router