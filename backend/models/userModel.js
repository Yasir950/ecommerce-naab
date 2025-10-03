import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    first:{type:String, required:true},
    last:{type:String},
    email:{type:String, required:true},
    password:{type:String, required:true},
    contact:{type:String},
    address:{type:String},
    country:{type:String},
    city:{type:String},
    is_admin:{type:Boolean, required:true, default: false},
},
{timestamps:true}
)

export default mongoose.model('users', userSchema);