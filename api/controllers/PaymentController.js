/**
 * PaymentController
 *
 * @description :: Server-side logic for managing payments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var stripe = require("stripe")("sk_test_yBA7fGk9W5jZ5YgeLfOcrogk");
var paypal = require('paypal-rest-sdk');
var express = require('express');
var router = express.Router();


// var payconf = {
//     user: lastplayus_api1.gmail.com
//     pass: UL4GLPEQWWCVZX93
//     sig: A0opbXy8CxfOt7jfT.r2S0mXEXQLA.2tg57ojoQmxyOX9EvKYiET.Due
// }

module.exports = {

    chargef: function(req, res) {

    	var stripeToken = req.body.stripeToken;

    	var charge = stripe.charges.create({
    		amount: 595, // amount in cents, again
    		currency: "usd",
    		card: stripeToken,
    		description: "Lastplay 1 Month"
    	}, function(err, charge) {
    		if (err && err.type === 'StripeCardError') {
                console.log(err);
                res.redirect("/subscription");
            } else {
                res.redirect("/home");
            }
    	});
    },

    chargefi: function(req, res) {

        var stripeToken = req.body.stripeToken;

        var charge = stripe.charges.create({
            amount: 1595, // amount in cents, again
            currency: "usd",
            card: stripeToken,
            description: "Lastplay 1 Month"
        }, function(err, charge) {
            if (err && err.type === 'StripeCardError') {
                console.log(err);
                res.redirect("/subscription");
            } else {
                res.redirect("/home");
            }
        });
    },

    chargetn: function(req, res) {

        var stripeToken = req.body.stripeToken;

        var charge = stripe.charges.create({
            amount: 2995, // amount in cents, again
            currency: "usd",
            card: stripeToken,
            description: "Lastplay 1 Month"
        }, function(err, charge) {
            if (err && err.type === 'StripeCardError') {
                console.log(err);
                res.redirect("/subscription");
            } else {
                res.redirect("/home");
            }
        });
    }


    // var create_payment_json = {
    //     "intent": "authorize",
    //     "payer": {
    //         "payment_method": "paypal"
    //     },
    //     "redirect_urls": {
    //         "return_url": "http://lastplay.live",
    //         "cancel_url": "http://lastplay.live"
    //     },
    //     "transactions": [{
    //         "item_list": {
    //             "items": [{
    //                 "name": "item",
    //                 "sku": "item",
    //                 "price": "1.00",
    //                 "currency": "USD",
    //                 "quantity": 1
    //             }]
    //         },
    //         "amount": {
    //             "currency": "USD",
    //             "total": "1.00"
    //         },
    //         "description": "Lastplay.live 1 month"
    //     }]
    // };
    //
    // paypal.configure({
    //   'mode': 'sandbox', //sandbox or live
    //   'client_id': 'EBWKjlELKMYqRNQ6sYvFo64FtaRLRR5BdHEESmha49TM',
    //   'client_secret': 'EO422dn3gQLgDbuwqTjzrFgFtaRLRR5BdHEESmha49TM'
    // });
    //
    //
    // paypal.payment.create(create_payment_json, function (error, payment) {
    //     if (error) {
    //         console.log(error.response);
    //         throw error;
    //     } else {
    //         for (var index = 0; index < payment.links.length; index++) {
    //         //Redirect user to this endpoint for redirect url
    //             if (payment.links[index].rel === 'approval_url') {
    //                 console.log(payment.links[index].href);
    //             }
    //         }
    //         console.log(payment);
    //     }
    // });
    //
    // var execute_payment_json = {
    //     "payer_id": "Appended to redirect url",
    //     "transactions": [{
    //         "amount": {
    //             "currency": "USD",
    //             "total": "1.00"
    //         }
    //     }]
    // };
    //
    // var paymentId = 'PAYMENT id created in previous step';
    //
    // paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    //     if (error) {
    //         console.log(error.response);
    //         throw error;
    //     } else {
    //         console.log("Get Payment Response");
    //         console.log(JSON.stringify(payment));
    //     }
    // });
    //
    // var capture_details = {
    //     "amount": {
    //         "currency": "USD",
    //         "total": "4.54"
    //     },
    //     "is_final_capture": true
    // };
    //
    // paypal.authorization.capture("5RA45624N3531924N", capture_details, function (error, capture) {
    //     if (error) {
    //         console.error(error);
    //     } else {
    //         console.log(capture);
    //     }
    // });

}
