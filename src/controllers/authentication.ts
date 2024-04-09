import { NextFunction, Request, Response } from 'express';
import { createUser, getUserByEmail } from '../models/user.js';
import { createSecretToken } from '../helpers/index.js';


export const registerController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {email, password, username, role} = req.body;
    if(!email || !password || !username) {
      return res.status(400).send("some values were missed");
    }

    const existUser = await getUserByEmail(email);

    if (existUser) {
      return res.status(403).json({message: "User with this email already exist"});
    }

    // const salt = random()

    const user = await createUser({
      email, 
      username,
      role,
      // authentication: {
      //   salt,
      //   password: authentication(salt, password)
      // }
   });
   req.body.user = user;
   next()
  } catch (error) {
    console.log(error);
    res.status(400).send({error});
  }
}

export const loginController = async (req: Request, res: Response) => {
  try {
    const {email, password} = req.body;

    if(!email || !password) {
      return res.status(400).json({message: 'No password or email!'})
    }

    const user = await getUserByEmail(email);

    if(!user) {
      return res.status(400).json({message: 'wrong email!'})
    }




    const token = createSecretToken({ id: user._id?.toString(), role: user.role });
    res.cookie('Authorization', token, {domain: 'localhost', path: '/'});

    return res.status(200).header('Authorization', `Bearer ${token}`).json(user).end()

  } catch (error) {
    res.status(400).send(error)
  }
}