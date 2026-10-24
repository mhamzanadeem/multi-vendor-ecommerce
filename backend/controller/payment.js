const express = require("express");
const router = express.Router();
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Disabled demo payments never initialize or call an external provider.
const stripe = process.env.PAYMENTS_ENABLED !== 'false' && process.env.STRIPE_SECRET_KEY
  ? require("stripe")(process.env.STRIPE_SECRET_KEY) : null;

router.post(
  "/process",
  catchAsyncErrors(async (req, res, next) => {
    if (!stripe) return res.status(503).json({ success: false, message: "Payments are disabled in this environment" });
    const myPayment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "inr",
      metadata: {
        company: "Becodemy",
      },
    });
    res.status(200).json({
      success: true,
      client_secret: myPayment.client_secret,
    });
  })
);

router.get(
  "/stripeapikey",
  catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({ stripeApikey: process.env.STRIPE_API_KEY });
  })
);


module.exports = router;