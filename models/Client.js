import mongoose from "mongoose";

const clientSchema = mongoose.Schema(
{
    merchant: [],
    name: { type: String },
    phone_number: { type: String },
    company: { type: String },
    email: {
        type: String,
        min: 5,
        max: 50,
        trim: true
    },
   
},
    { timestamps: true }
)
const Client = mongoose.model('client', clientSchema);
export default Client;