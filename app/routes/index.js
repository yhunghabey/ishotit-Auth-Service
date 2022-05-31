import { errorMessage } from "iyasunday";
import user from "../module/user";

export default (app) => {
  const version = "/v1";
  app.use(version, user);
  


  app.use((err, req, res, next) => {
    if (err) {
      res.status(err.httpStatusCode || 500).json(errorMessage(err));
    }
    return next();
  });

  app.use((req, res) => {
    res
      .status(404)
      .json({
        message: `Requested route ( ${req.get("HOST")}${
          req.originalUrl
        } ) not found`,
      });
  });
};
