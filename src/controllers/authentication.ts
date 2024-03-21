import { Request, Response } from 'express';
import { createUser, getUserByEmail } from '../models/user.js';
import { authentication, random } from '../helpers/index.js';
export const registerController = async (req: Request, res: Response) => {
  try {
    const {email, password, username} = req.body;
    if(!email || !password || !username) {
      return res.status(400).send("some values were missed");
    }

    const existUser = await getUserByEmail(email);

    if (existUser) {
      return res.sendStatus(403);
    }

    const salt = random()
    const user = await createUser({
      email, 
      username, 
      authentication: {
        salt,
        password: authentication(salt, password)
      }
   });

   return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
}