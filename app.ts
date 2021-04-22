import express, { Application, NextFunction, Request, Response } from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema, GraphQLSchema } from "graphql";
import Mutation from "./graphql/mutation";
import QueryRoot from "./graphql/queries";
const app = express();
import bodyParser from "body-parser";
import { IUserDocument } from "./models/user.model";

interface IAuthenticatedRequest extends Request {
  user?: IUserDocument;
  isAuth: boolean;
}
require("./db/connectDb")();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
const AppSchema = new GraphQLSchema({
  mutation: Mutation,
  query: QueryRoot,
});

// app.use(middleware);

app.get("/", (req, res) => {
  res.send("hello world");
});
// app.use(authMiddleware);
app.use(
  "/graphql",
  graphqlHTTP((req, res, next) => ({
    graphiql: true,
    schema: AppSchema,
    context: { req, res, next },
  }))
);

app.listen(4000, () => {
  console.log("App running");
});
