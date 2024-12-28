import { Request, Response, NextFunction } from "express";
import supabase from "../configs/supabase";
import { AuthUserRequest } from "../types/app.type";

// Middleware to check accessToken and user role
export const checkAccessToken = async (
  req: AuthUserRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { accessToken } = req.body;
    if (!accessToken) {
      res.status(400).json({ error: "accessToken is required" });
      return;
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(accessToken);
    if (error || !user) {
      res.status(401).json({ error: "Invalid or expired accessToken" });
      return;
    }

    if (user.role !== "authenticated") {
      res.status(403).json({ error: "User does not have the correct role" });
      return;
    }

    req.body.user = user;

    next();
  } catch (error) {
    res.status(500).json({ error: "An unexpected error occurred" });
  }
};
