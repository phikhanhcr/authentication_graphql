import { GraphQLList, GraphQLNonNull } from "graphql";


import { Login, getAllUser, Logout } from "../resolvers/user.resolver";
import { UserInputType, UserRegister, UserType } from "../types/user.type";
const userQueries = {
  getAllUser: {
    resolve: (source: any, args: any, context: any, info: any) => {
      
      return getAllUser(source, args.input, context, info);
    },
    type: new GraphQLNonNull(GraphQLList(UserType)),
  },
  checkLogin: {
    args: { input: { type: GraphQLNonNull(UserInputType) } },
    resolve: (source: any, args: any, context: any, info: any) => {
      return Login(source, args.input, context, info);
    },
    type: new GraphQLNonNull(UserType),
  },
  logout : {
    resolve: (source: any, args: any, context: any, info: any) => {
      return Logout(source, args.input, context, info);
    },
    type: new GraphQLNonNull(UserType),
  }
};

export default userQueries;
