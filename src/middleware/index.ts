import { NextFunction, Request, Response } from "express";
import lodash from 'lodash';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sessionToken = req.headers['authorization'];
    const token = sessionToken && sessionToken.split(' ')[1];
    if(!token){
      return res.status(403).json({message: 'An authorized'})
    }
    
    jwt.verify(token, process.env.SECRET, (err: JsonWebTokenError, decoded: JsonWebKey) => {
      if(err) {
        return res.status(403).json({message: 'Invalid token'})
      }
      lodash.merge(req, {authenticationToken: decoded})
      next()
    })
  } catch (error) {
    res.status(403).json(error); 
  }
}