import express, { Response } from "express";
import { checkAccessToken } from "../middlewares/auth_middleware";
import { AuthUserRequest } from "../types/app.type";

const videoRouter = express.Router();

videoRouter.post(
  "/render",
  checkAccessToken,
  (req: AuthUserRequest, res: Response) => {
    const user = req.body.user;
    res.json({
      message: "Access granted",
      user,
    });
  }
);

export default videoRouter;
