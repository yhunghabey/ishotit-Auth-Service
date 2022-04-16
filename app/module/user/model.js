import mongoose from 'mongoose';
import { date } from 'joi';
import bcrypt from 'bcrypt';
import { compare } from "bcryptjs";
import Jwt from 'jsonwebtoken';
import { USERTYPE } from '../../utils/constant';

export const ACCOUNT_STATUS = {
  ACTIVE: "ACTIVE",
  UNVERIFIED: "UNVERIFIED",
  DEACTIVATED: "DEACTIVATED",
  BLOCKED: "BLOCKED",
};


const UserSchema = mongoose.Schema({
  userID: {
    type: String,
  },
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    unique: [true, 'User with email already exists'],
  },
  username: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    //unique: [true, 'User with phone number already exists'],
  },
  password: {
    type: String,
    minlength: 6,
    select: false,
  },
  userType: {
    type: String,
    enum: Object.keys(USERTYPE),
    default: 'USER',
  },
  permissions: {
    type: Array,
  },
  status: {
    type: String,
    enum: Object.keys(ACCOUNT_STATUS),
    default: ACCOUNT_STATUS.UNVERIFIED,
  },
  token: {
    type: String,
  },
  photo: {
    type: String,
  },
  gender: {
    type: String,
    enum: ['MALE', 'FEMALE'],
  },
  createdAt: {
      type: Date,
      default: Date.now
  },
  deleted: {
    type: Boolean,
    default: false,
    select: false,
  },
});
  
UserSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});
UserSchema.methods.getSignedJwtToken = async function(){
    // return Jwt.sign({_id: this._id}, process.env.JWT_SECRET, {
    //   expiresIn: process.env.JWT_TOKEN_VALIDITY
    // })

    // Generate an auth token for the user
  try {
    const user = this;
    const token = Jwt.sign({ _id: user._id }, JWTSECRET);
    user.token = token;
    await user.save();
    return user;
  } catch (err) {
    return console.log(err);
  }
};
UserSchema.methods.matchPassword = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password);
};

export async function comparePassword(plainText, hash) {
  try {
    return await compare(plainText, hash);
  } catch (err) {
    throw err;
  }
}

export default mongoose.model('User', UserSchema);




