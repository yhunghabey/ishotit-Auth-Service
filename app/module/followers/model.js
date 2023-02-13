import mongoose from 'mongoose';
import user from '../user/model';

const FriendMgtSchema = mongoose.Schema({

  user: {
    type: String,
    required: true,
  },

  requestUser: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
  },

  username: {
    type: String,
  },

  photo: {
    type: String,
  },

  status: {
    type: String,
    enum: ['PENDING', 'DECLINED', 'ACCEPTED'],
    default: 'PENDING',
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


export default mongoose.model('FriendMgt', FriendMgtSchema);




