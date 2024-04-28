import crypto from 'crypto';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
const hour = 60 * 60;
const day = 24 * 60 * 60;
export const random = () => crypto.randomBytes(128).toString('base64');

export const authentication = (salt: string, password: string) => {
  return crypto.createHmac('sha256', [salt, password].join('/')).update(process.env.SECRET).digest('hex')
} 

export type Payload = {
  id: string,
  role: string,
} 
export const createSecretToken = (payload: Payload) => {
  return jwt.sign(payload, process.env.SECRET, {expiresIn: hour})
}
export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.SECRET)
}

export const createRefreshSecretToken = (payload: Payload) => {
  return jwt.sign(payload, process.env.SECRET_REFRESH_TOKEN, {expiresIn: day})
}
export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, process.env.SECRET_REFRESH_TOKEN)
}