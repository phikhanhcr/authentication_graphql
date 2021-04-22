import { GraphQLObjectType } from "graphql";
import userMutation from "./user/mutaions/user.mutation";

const Mutation = new GraphQLObjectType({
  fields : {
    ...userMutation
  },
  name: "Mutation",
});

export default Mutation;
