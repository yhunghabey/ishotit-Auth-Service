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
    if (getFriends === "") throw new NotFoundError("No Friend Request Found");
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
    const getFriends = await Friend.find({ requestUser: user.id, status: 'PENDING' });
    if (getFriends === "") throw new NotFoundError("No Friend Request Found");
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
    const declineRequest = await Friend.findOneAndDelete({ requestUser: body.requestUser });
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
    const getFriends = await Friend.find({user: user._id, requestUser: user._id, status: 'ACCEPTED'});
    
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

export async function searchUser(body) {
  try {
    const result = await User.find({
      $or: [
        { 'username': { $regex: body.search, $options: 'i' } },
        { 'firstname': { $regex: body.search, $options: 'i' } },
        { 'lastname': { $regex: body.search, $options: 'i'}},
      ],
    }); 
    return {
      success,
      data: result,
      message: `Search Retrieved Successfully`,
    };
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function friendRequestStatus(user, body){
  try {
    const checkRequest = await Friend.find ({ $or: [{ requestUser: body.userID}, {requestUser: user._id} ] } );
    
    if (!checkRequest) {
      throw new ExistsError("No Friend Request Found");
    }
    return {
      success,
      data: checkRequest,
      message: `Like Status Retrieved Successfully`,
    };
  } catch (err) {
    throw err;
  }
}

