import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { Payload, createSecretToken, verifyRefreshToken } from "../helpers/index.js";

export const refreshTokenController = async (req: Request, res: Response) => {
  const {refreshToken} = req.cookies;
  if (!refreshToken) {
    res.status(403).send({message: "RefreshToken is required!"})
  }
  try {
    const decoded = verifyRefreshToken(refreshToken) as Payload;
    const accessToken = createSecretToken({id:decoded.id, role: decoded.role})
   
    res
      .header('Authorization', `Bearer ${accessToken}`)
      .send(decoded)
  } catch (error) {
    console.log(error);
    res.status(400).send({message: "Invalid refresh token"})
  }
}