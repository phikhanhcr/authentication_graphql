import {
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
interface IUserLogin {
  email : string, 
  password : string
}

interface IUserRegister extends IUserLogin , Document{
  email : string, 
  password : string,
  username : string
}


const UserRegister = new GraphQLInputObjectType ({
  description: "User Type Register",
  fields: {
    username: {
      type: GraphQLString,
    },
    password: {
      type: GraphQLString,
    },
    email: {
      type: GraphQLString,
    },
  },
  name: "UserTypeRegister",
})

 const UserType = new GraphQLObjectType({
  description: "User Type",
  fields: {
    username: {
      type: GraphQLString,
    },
    password: {
      type: GraphQLString,
    },
    email: {
      type: GraphQLString,
    },
    personalKey: {
      type: GraphQLString,
    },
    _id: { type: GraphQLString },
    createdAt: {
      type: GraphQLString,
    },
    updatedAt: {
      type: GraphQLString,
    },
  },
  name: "UserType",
});

const UserInputType = new GraphQLInputObjectType({
  description: " User Input Type",
  fields: {
    email: {
      type: GraphQLString,
    },
    password : {
      type: GraphQLString,
    }
  },
  name: "UserInputType",
});

export { UserType, UserInputType , IUserLogin, UserRegister, IUserRegister};
