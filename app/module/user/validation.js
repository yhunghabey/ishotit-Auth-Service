import Joi from "joi";

export default{
  
    signup: {
        body: {
          schema: Joi.object({
             email: Joi.string()
              .email()
              .trim()
              .lowercase()
              .required(),
            password: Joi.string().required(),
            username: Joi.string()
              .lowercase()
              .min(3)
              .trim()
              .required(),
            firstname: Joi.string()
              .max(50)
              .trim()
              .optional(),
            lastname: Joi.string()
              .max(50)
              .trim()
              .optional(),
            userType: Joi.string()
              .valid('USER', 'ADMIN')
              .trim(),
            photo: Joi.string(),
            token: Joi.string(),
          }),
        },
      },

      login: {
        body: {
          schema: Joi.object({
            email: Joi.string()
              .email()
              .trim()
              .lowercase()
              .required(),
            password: Joi.string().required(),
          }),
        },
      },

      update: {
        body: {
          schema: Joi.object({
            firstname: Joi.string()
              .max(20)
              .trim(),
            lastname: Joi.string()
              .max(20)
              .trim(),
            username: Joi.string()
              .lowercase()
              .regex(
                /^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){2,50}[a-zA-Z0-9]$/
              )
              .max(20)
              .trim(),
            phoneNumber: Joi.string()
              .trim(), 
            gender: Joi.string().valid("MALE", "FEMALE"),
            photo: Joi.string(),
          }),
        },
      },

      getUser: {
        body: {
          schema: Joi.object({
            id: Joi.string().max(36),
          }),
        },
      },

      view: {
        params: {
          schema: Joi.object({
            id: Joi.string().max(36),
          }),
        },
      },

      changePassword: {
        body: {
          schema: Joi.object({
            oldPassword: Joi.string().required(),
            newPassword: Joi.string().required(),
            confirmPassword: Joi.string().required(),
          }),
        },
      },

      verifyEmail: {
        params: {
          schema: Joi.object({
            token: Joi.string().required(),
          }),
        },
      },

      sendEmailVerification: {
        body: {
          schema: Joi.object({
            email: Joi.string()
              .email()
              .trim(),
          }),
        },
      },

      updateAccountStatus: {
        body: {
          schema: Joi.object({
            status: Joi.string()
              .valid("ACTIVE", "BLOCKED", "PENDING", "DEACTIVATE")
              .required(),
          }),
        },
      },
}