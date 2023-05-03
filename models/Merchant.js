import mongoose from "mongoose";

const merchantSchema = mongoose.Schema(
{
    client:{ type: String },
    merchant:{ type: String },
    name: { type: String },
    phone_number: { type: String },
    email: {
        type: String,
        // min: 5,
        // max: 50
    },
   
},
    { timestamps: true }
)
const Merchant = mongoose.model('merchant', merchantSchema);
export default Merchant;