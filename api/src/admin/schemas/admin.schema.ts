import * as mongoose from 'mongoose';

export const AdminSchema = new mongoose.Schema({
  fullName: {
    type: String,
    minlength: 5,
    maxlength: 40,
    required: true
  },
  userName: {
    type: String,
    minlength: 2,
    maxlength: 10,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    minlength: 8,
    required: true
  },
  photo: {
    type: String,
    default: 'http://mybroadband.co.za/news/wp-content/uploads/2017/04/Twitter-profile-picture.jpg',
    required: true
  },
  birthDay: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});