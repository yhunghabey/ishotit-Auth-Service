"use strict";
import { Router } from "express";
import { joiValidator } from "iyasunday";
import { guard } from "../../utils/middleware";
import * as controller from "./controller";
import validation from "./validation";


const route = Router();



route.post("/friends/sendrequest",
  guard(),
  joiValidator(validation.sendRequest),
  controller.sendRequest);

route.get("/friends/myfriend/request",
  guard(),
  controller.myFriendRequest);

route.get("/friends/incoming/request",
  guard(),
  controller.incomingRequest);

route.post("/friends/accept/request",
  guard(),
  joiValidator(validation.acceptRequest),
  controller.acceptRequest);

route.post("/friends/decline/request",
  guard(),
  joiValidator(validation.declineRequest),
  controller.declineRequest);  
 
route.get("/friends/list",
  guard(),
  controller.getFriends);  

export default route;
