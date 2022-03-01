"use strict";
import { Router } from "express";
import { joiValidator } from "iyasunday";
import { guard } from "../../utils/middleware";
import * as controller from "./controller";
import validation from "./validation";

const route = Router();

route.post("/user/signup", joiValidator(validation.signup), controller.signup);

route.post("/user/login", joiValidator(validation.login), controller.login);

route.patch(
  "/user/update",
  guard(),
  joiValidator(validation.update),
  controller.update
);

route.get(
  "/user/:id",
  guard(),
  joiValidator(validation.getUser),
  controller.getuser
);

route.get(
  "/users",
  guard(),
  //joiValidator(validation.update),
  controller.getusers
);

route.patch(
  "/user/update/password",
  guard(),
  joiValidator(validation.changePassword),
  controller.changePassword
);

route.get(
  "/user/verification/email/:token",
  joiValidator(validation.verifyEmail),
  controller.verifyEmail
);

route.post(
  "/user/verification/email",
  joiValidator(validation.sendEmailVerification),
  controller.sendEmailVerification
);

export default route;
