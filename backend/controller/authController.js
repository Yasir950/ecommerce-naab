import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import handleError from '../utils/errorhandler.js';
import bcrypt from 'bcrypt';

const createToken = (user) => {
    return jwt.sign({id: user._id, email: user.email, is_admin: user.is_admin}, process.env.JWT_SECRET, {expiresIn: '1d'});
}
export const userLogin =  (isAdmin = false) => async (req, res)=> {
    try {
         const { email, password } = req.body;
    const user = await User.findOne({email, is_admin:isAdmin});
    if(!user){
        return res.status(400).json({message: 'User not found'});
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(400).json({message: 'Invalid credentials'});
    }
    const token = createToken(user);
    res.status(200).json({token, user});
    } catch (error) {
        handleError(error, res)
    }
   
}

