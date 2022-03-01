import * as service from './service';

export async function signup(req,res,next){
    try {
        return res.status(200).json(await service.signup(req.body))
    } catch (err) {
        next(err);
    }
}

export async function login(req,res,next){
    try {
        return res.status(200).json(await service.login(req.body))
    } catch (err) {
        next(err);
    }
}

export async function update(req,res,next){
    try {
        return res.status(200).json(await service.update(req.user, req.body))
    } catch (err) {
        next(err);
    }
}

export async function getuser(req,res,next){
    try {
        return res.status(200).json(await service.getUser(req.user, req.body))
    } catch (err) {
        next(err);
    }
}

export async function getusers(req,res,next){
    try {
        return res.status(200).json(await service.getUsers(req.user, req.body))
    } catch (err) {
        next(err);
    }
}

export async function changePassword(req,res,next){
    try {
        return res.status(200).json(await service.changePassword(req.user, req.body))
    } catch (err) {
        next(err);
    }
}

export async function updateAccountStatus(req, res, next) {
    try {
      res.status(200).json(await service.updateAccountStatus(req.body));
    } catch (err) {
      next(err);
    }
  }

  export async function sendEmailVerification(req, res, next) {
    try {
      res.status(200).json(await service.sendEmailVerification(req.body));
    } catch (err) {
      next(err);
    }
  }
  
  export async function verifyEmail(req, res, next) {
    try {
      res.status(200).json(await service.verifyEmail(req.params));
    } catch (err) {
      next(err);
    }
  }