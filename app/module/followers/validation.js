import Joi from "joi";

export default{
  
    sendRequest: {
        body: {
          schema: Joi.object({
            requestUser: Joi.string(),
          }),
        },
      },

      acceptRequest: {
        body: {
          schema: Joi.object({
            requestUser: Joi.string(),
          }),
        },
      },

      declineRequest: {
        body: {
          schema: Joi.object({
            requestUser: Joi.string(),
          }),
        },
      },
}