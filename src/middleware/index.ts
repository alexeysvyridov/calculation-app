import { NextFunction, Request, Response } from "express";
import lodash from 'lodash';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { Payload, createSecretToken, verifyToken } from "../helpers/index.js";

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  const sessionToken = req.headers['authorization'];
  const refreshToken = req.headers['refreshToken'] as string;
  const token = sessionToken && sessionToken.split(' ')[1];
  const refresh = refreshToken && refreshToken.split(' ')[1];
  try {

    if(!token && !refreshToken){
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
    if (!refreshToken) {
      res.status(403).send({message: 'Access denied. No refresh token provided'})
    }
    
    try {
     const decoded = verifyToken(refresh) as Payload;
     const accessToken = createSecretToken({id: decoded.id, role: decoded.role})

    res
    .cookie('refreshToken', refreshToken, {httpOnly: true, sameSite: 'strict'})
    .header('Authorization', accessToken)
    .send(decoded)

    } catch (error) {
      return res.status(400).send('Invalid Token.');
    }
  }
}