import crypto from 'crypto';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
const day = 24 * 60 * 60;
export const random = () => crypto.randomBytes(128).toString('base64');

export const authentication = (salt: string, password: string) => {
  return crypto.createHmac('sha256', [salt, password].join('/')).update(process.env.SECRET).digest('hex')
} 

type Payload = {
  id: string,
  role: string,
} 
export const createSecretToken = (payload: Payload) => {
  return jwt.sign(payload, process.env.SECRET, {expiresIn: day})
}
export const verifyToken = (id: string) => {
  return jwt.sign({id}, process.env.SECRET, {expiresIn: day})
}