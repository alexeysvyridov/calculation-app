import { model, Schema } from "mongoose";

const UserSchema = new Schema({
  username: {type: String, required: true},
  email: {type: String, required: true},
  role: {type: String, required: true},
  authentication: {
    password: {type: String, required: true, select: false},
    salt: { type: String, select: false},
    sessionToken: { type: String, select: false}
  }
})


export const UserModel = model('User', UserSchema);

export const getUsers = UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({email});
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({'authentication.sessionToken': sessionToken});
export const getUserById = (id: string) => UserModel.findById(id);
export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject())
export const deleteUser = (id: string) => UserModel.findOneAndDelete({_id: id});
export const updateUser = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values)  