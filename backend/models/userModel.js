import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    move_id:{type:String, required:true},
    text:{type:String, required:true},
    date:{type:String, required:true},
})

export default mongoose.model('users', userSchema);