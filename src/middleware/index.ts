import { NextFunction, Request, Response } from "express";
import { getUserBySessionToken } from "../models/user.js";
import lodash from 'lodash';

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sessionToken = req.cookies['AUTH'];
    if(!sessionToken){
      return res.status(403).json({message: 'An authorized'})
    }
    const user = await getUserBySessionToken(sessionToken);

    lodash.merge(req, {identity: user})
    next()
  } catch (error) {
    res.status(403).json(error); 
  }
}