import { IUserLogin, IUserRegister } from "../types/user.type";
import UserModel from "../../../models/user.model";
import jwtService from "../../../JwtServices/jwtService";
import userModel from "../../../models/user.model";
import { middleware } from "../../../middleware/JwtGuardMiddleware";

const getAllUser = async (source: any, args: any, { req, res, next }: any, info: any) => {
  await middleware(req, res, next);
  console.log(100, { check: req.user });
  const users = await userModel.find();
  return users;
};

const Login = async (source: any, args: any, context: any, info: any) => {
  const { email, password } = args;

  const foundUser = await UserModel.findOne({ email });
  if (!foundUser || !(await foundUser.isPasswordValid(password))) {
    throw Error("username or password is invalid");
  }

  const accessToken = jwtService.sign(
    { _id: foundUser._id, username: foundUser.username },
    foundUser.personalKey
  );
  console.log({ accessToken });
  return foundUser;
};

const Register = async (args: IUserRegister) => {
  const { email, password, username } = args;
  console.log({ email, password, username });
  const foundUser = await UserModel.findOne({ $or: [{ username }, { email }] });
  if (foundUser) {
    throw Error("username or email is existed");
  }
  const newUser = await UserModel.create({
    username,
    password,
    email,
  });

  return newUser;
};


const Logout = async (source: any, args: any, { req, res, next }: any, info: any) => {
  await middleware(req, res, next);
  const { user } = req;
  await user!.logout();
  console.log("Logout successfully!");
  return user;

}



export { Login, Register, getAllUser, Logout };
