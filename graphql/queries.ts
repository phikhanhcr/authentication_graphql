import { GraphQLObjectType } from "graphql";
import userQueries from "./user/queries/user.query";

const QueryRoot = new GraphQLObjectType({
  fields : {
    ...userQueries
  },
  name: "QueryRoot",
});

export default QueryRoot;
