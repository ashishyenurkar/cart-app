import Stripe from "stripe";

const stripe = new Stripe("sk_test_51NTesYSFOGNeWuAgaKyCAmYUgS5oELm1fzKcWbrA3PChUBxgF06862445ZD08S0WsTBKLifBSvLmndrkYX0StzVD00JnRu7mlq");

export const processPayment = async (req, res, next) => {
    try {
        const { amount } = req.body;
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "inr",
            metadata: {
                company: "StackyEcommerce",
            },
        });
        res.status(200).json({ success: true,paymentIntent });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const sendStripeApiKey = async (req, res, next) => {
    try {
        res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
