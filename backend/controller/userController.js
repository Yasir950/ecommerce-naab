import User from "../models/userModel.js"
import handleError from '../utils/errorhandler.js'
import bcrypt from 'bcrypt';
const getUsers= async (req,res)=>{
    try {
        const { email } = req.query;

    let filter = {};
    if (email) {
      filter.email = email;
    }
     const users= await User.find(filter);
    res.status(201).json(users)   
    } catch (error) {
    handleError(error,res)  
    }
}

const saveUser= async(req,res)=>{
    try {
        const userExists = await User.findOne({email: req.body.email})
        if(userExists){
        return res.status(400).json({message: 'User already exists'});
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
     const user = new User({
      ...req.body,
      password: hashedPassword,
    });

    const savedUser = await user.save();
    res.status(201).json(savedUser);
    } catch (error) {
        handleError(error, res)
    }
}
const updatedUsers= async(req,res)=>{
    try {
        const {id} = req.params;
        const userExists = await User.findOne({_id: req.params.id});
    if(!userExists){
        return res.status(400).json({message: 'User not found'});
    }
        const updatedUser = await User.findByIdAndUpdate(id, req.body, {new: true});
            res.status(201).json(updatedUser);
    } catch (error) {
        handleError(error, res)
    }
}
const deleteUser= async(req,res)=>{
    try {
        const {id} = req.params;
        const userExists = await User.findOne({_id:id});
    if(!userExists){
        return res.status(400).json({message: 'User not found'});
    }
    
        const deletedUser = await User.findByIdAndDelete(id);
            res.status(201).json(deletedUser);
        
    } catch (error) {
        handleError(error, res)
    }
}
export {getUsers, saveUser, updatedUsers, deleteUser};