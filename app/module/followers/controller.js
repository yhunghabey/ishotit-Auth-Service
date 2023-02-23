import * as service from './service';


export async function sendRequest(req,res,next){
    try {
        return res.status(200).json(await service.sendRequest(req.user, req.body))
    } catch (err) {
        next(err);
    }
}

export async function myFriendRequest(req,res,next){
    try {
        return res.status(200).json(await service.myFriendRequest(req.user))
    } catch (err) {
        next(err);
    }
}

export async function incomingRequest(req,res,next){
    try {
        return res.status(200).json(await service.incomingRequest(req.user))
    } catch (err) {
        next(err);
    }
}

export async function acceptRequest(req,res,next){
    try {
        return res.status(200).json(await service.acceptRequest(req.body))
    } catch (err) {
        next(err);
    }
}

export async function declineRequest(req,res,next){
    try {
        return res.status(200).json(await service.declineRequest(req.body))
    } catch (err) {
        next(err);
    }
}

export async function getFriends(req,res,next){
    try {
        return res.status(200).json(await service.getFriends(req.user))
    } catch (err) {
        next(err);
    }
}

export async function searchUser(req, res, next) {
    try {
      return res.status(200).json(await service.searchUser(req.body));
    } catch (err) {
      next(err);
    }
  }


export async function decline(req,res,next){
    try {
        return res.status(200).json(await service.changePassword(req.user, req.body))
    } catch (err) {
        next(err);
    }
}

export async function updateAccountStatus(req, res, next) {
    try {
      res.status(200).json(await service.updateAccountStatus(req.user, req.body));
    } catch (err) {
      next(err);
    }
  }

  export async function friendRequestStatus(req,res,next){
    try {
        return res.status(200).json(await service.friendRequestStatus(req.user, req.body))
    } catch (err) {
        next(err);
    }
}
