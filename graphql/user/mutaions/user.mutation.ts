import { GraphQLNonNull } from "graphql";
import { UserRegister, UserType } from "../types/user.type";
import { Register } from "../resolvers/user.resolver";
const userMutation = {
  register: {
    args: { input: { type: GraphQLNonNull(UserRegister) } },
    resolve: (source: any, args: any, context: any, info: any) => {
      return Register(args.input);
    },
    type: new GraphQLNonNull(UserType),
  },
};

export default userMutation;
