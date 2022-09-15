import mongoose from 'mongoose';

const FriendMgtSchema = mongoose.Schema({

  user: {
    type: String,
    required: true,
  },

  requestUser: {
    type: String,
    required: true,
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




