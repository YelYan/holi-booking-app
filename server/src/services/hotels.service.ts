import type { Request } from "express";

import EntityNotFoundError from "#errors/EntityNotFoundError.js";
import PaymentError from "#errors/PaymentError.js";
import StripeEnvError from "#errors/StripeEnvError.js";
import Hotel from "#models/hotel.model.js";
import Stripe from "stripe";

interface BookingType {
  _id?: string;
  adultCount: number;
  checkIn: Date | null;
  checkOut: Date | null;
  childCount: number;
  email: string;
  name: string;
  totalCost: number;
  userId: string;
};

const apiKey = process.env.STRIPE_API_KEY;
if (!apiKey) {
  throw new StripeEnvError({
    code: "ERR_ENV_STRIPE",
    message: "Missing STRIPE_API_KEY environment variable",
    statusCode: 500
  });
}
const stripe = new Stripe(apiKey);

class hotelService {

    public async confirmPayment (paymentIntentId : string, req : Request) {
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        if(paymentIntent.status !== "succeeded") {
            throw new PaymentError({
                code : "ERR_PAYMENT",
                message: `Payment failed with status: ${paymentIntent.status}`,
                statusCode: 400
            });
        }

        if(paymentIntent.metadata.hotelId !== req.params.hotelId || paymentIntent.metadata.userId !== req.auth.payload.userId) {
            throw new PaymentError({
                code : "ERR_PAYMENT",
                message: "Payment metadata does not match",
                statusCode: 400
            });
        }

        // Extract booking details from payment metadata
        const { totalCost } = paymentIntent.metadata;

        const {
            adultCount,
            childCount,
            email,
            name,
            checkIn,
            checkOut
        } = req.body as Partial<BookingType>;


        const newBooking: BookingType = {
            adultCount: Number(adultCount),
            childCount: Number(childCount),
            email: String(email),
            name: String(name),
            userId: req.auth.payload.userId,
            totalCost: parseFloat(totalCost),
            checkIn: checkIn ? new Date(checkIn) : null,
            checkOut: checkOut ? new Date(checkOut) : null
        };

        const hotel = await Hotel.findOneAndUpdate({_id : req.params.hotelId}, {
            $push : { bookings : newBooking }
        }, {new : true});


        if(!hotel){
            throw new EntityNotFoundError({
                code : "ERR_NF",
                message : "Hotel not Found!",
                statusCode : 404
            });
        }
      
        return { booking : newBooking, hotel };
    }


    public async createpaymentIntent(hotelId : string, userId: string , numberOfNights : number) {
        const hotel = await this.getMyHotelById(hotelId, userId);
        if(!hotel) {
            throw new EntityNotFoundError({
                code : "ERR_NF",
                message : "Hotel not Found!",
                statusCode : 404
            })
        }
        const totalCosts = hotel.pricePerNight * numberOfNights;

        const paymentIntent = await stripe.paymentIntents.create({
            amount : totalCosts * 100, // convert to cents
            currency : "usd",
            metadata : {
                hotelId, 
                userId,   
                numberOfNights: numberOfNights.toString(),
                totalCost: totalCosts.toString()
            },
            // Add automatic capture (money moves immediately)
            capture_method: 'automatic',
        })

        const clientSecret = paymentIntent.client_secret;
        if(!clientSecret) {
            throw new PaymentError({
                code : "ERR_PAYMENT",
                message : "Payment Intent Error",
                statusCode : 500
            })
        }

        const response = {
            paymentIntentId : paymentIntent.id,
            clientSecret : clientSecret,
            totalCosts
        }
        return response;
    }

    public async getMyHotelById (hotelId : string, userId : string) {
        return await Hotel.findOne({_id : hotelId, userId});
    }


    
}

export default new hotelService();