// require("dotenv").config();
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(functions.config().ecomreactstripe.key);
// const stripe = require("stripe")(process.env.SECRET_KEY);

//API
//- API config
const app = express();

//- Middleware
app.use(cors({ origin: true }));
app.use(express.json());

//- API routes
app.get("/", (request, response) => response.status(200).send("hello world"));
app.post("/payments/create", async (request, response) => {
    const total = request.query.total;
    console.log('Payment Request Received BOOM!! for this amount >>>', total);
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "aud",
    });

    console.log("Payment Intent >>>", paymentIntent);

    response.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
});
//- listen command

exports.api = functions.https.onRequest(app);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
