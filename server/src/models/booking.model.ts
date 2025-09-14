import {Document, model, Schema} from "mongoose";

// The IBooking interface defines the shape of our Booking document
export interface IBooking extends Document {
    adultCount: number;
    checkIn: Date;
    checkOut: Date;
    childCount: number;
    email: string;
    firstName: string;
    lastName: string;
    totalCost: number;
    userId: string;
}

const bookingSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  adultCount: { type: Number, required: true },
  childCount: { type: Number, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  userId: { type: String, required: true },
  totalCost: { type: Number, required: true },
},   { timestamps: true })

const Booking = model("Booking", bookingSchema);

export default Booking