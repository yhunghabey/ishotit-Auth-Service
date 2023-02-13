import Friend from "./model";
import User from "../user/model";
import {
  success,
  ExistsError,
  NotFoundError,
} from "iyasunday";


export async function sendRequest(user, body) {
  try {
    const findUser = await User.findOne({_id: user.id });
    const isExist = await Friend.findOne({ requestUser: body.requestUser });
    if (isExist) {
      throw new ExistsError(`A request already Exist`);
    }
    let request = new Friend();
    request.user = user.id;
    request.username = findUser.username;
    request.photo = findUser.photo;
    request.requestUser = body.requestUser;
    await request.save();
    return {
      success,
      message: `A Request has been Sent to ${body.requestUser}`,
      data: request,
    };
  } catch (err) {
    throw err;
  }
}

export async function myFriendRequest(user) {
  try {
    const getFriends = await Friend.find({ user: user.id, status: 'PENDING'  });
    if (getFriends == "") throw new NotFoundError("No Friend Request Found");
    return {
      success,
      data: getFriends,
      message: `List of Friend Request Retrieved Successfully`,
    };
  } catch (err) {
    throw err;
  }
}

export async function incomingRequest(user) {
  try {
    const getFriends = await Friend.find({ requestUser: user.id });
    if (getFriends == "") throw new NotFoundError("No Friend Request Found");
    return {
      success,
      data: getFriends,
      message: `List of Incoming Request Retrieved Successfully`,
    };
  } catch (err) {
    throw err;
  }
}

export async function acceptRequest(body) {
  try {
    const acceptRequest = await Friend.findOneAndUpdate({ requestUser: body.requestUser }, {status: 'ACCEPTED'}, {new: true });
    if (!acceptRequest) {
      throw new NotFoundError("User not found");
    }
    return {
      success,
      data: acceptRequest,
      message: `Friend Successfully Accepted`,
    };
  } catch (err) {
    throw err;
  }
}

export async function declineRequest(body) {
  try {
    const declineRequest = await Friend.findOneAndUpdate({ requestUser: body.requestUser }, {status: 'DECLINED'}, {new: true });
    if (!declineRequest) {
      throw new NotFoundError("User not found");
    }
    return {
      success,
      data: declineRequest,
      message: `Friend Successfully Declined`,
    };
  } catch (err) {
    throw err;
  }
}

export async function getFriends(user) {
  try {
    const getFriends = await Friend.find({user: user.id, status: 'ACCEPTED'});
    if (!getFriends) throw new NotFoundError("Sorry! You do not have a friend");
    return {
      success,
      data: getFriends,
      message: `Friends Retrieved Successfully`,
    };
  } catch (err) {
    throw err;
  }
}

