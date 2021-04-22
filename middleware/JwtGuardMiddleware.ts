import express, { Application, NextFunction, Request, Response } from "express";
import jwtService from "../JwtServices/jwtService";
import userModel from "../models/user.model";

const middleware = async (req: Request, res: Response, next: NextFunction) => {
  const header: any = req.headers['authentication']
    || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDgwZmE3ZWFhNGQ4ZjNkNzg1MWExZmUiLCJ1c2VybmFtZSI6IktoYW5oIiwiaWF0IjoxNjE5MDg0OTI1LCJleHAiOjE2MTkxNzEzMjV9.8Fe2kDbG9EdH1C5xJ0HAsCzwOg2NEae5rUHgjqp8Ay8";
  console.log({ header });
  if (!header) {

    throw new Error("Token not provided!");
  }
  const payload = jwtService.decodePayload(header);
  const user = await userModel.findById(payload._id);
  if (!user) {
    throw new Error("Invalid Token!");
  }
  jwtService.verify(header, user.personalKey);
  console.log(user, 1000);
  // @ts-ignore
  req.user = user;
  // @ts-ignore
  // next();
}
export { middleware }