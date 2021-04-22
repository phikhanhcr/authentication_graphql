import { Document, Model, Schema, model } from "mongoose";
import bcrypt from "bcrypt";
interface IUser {
  username: string;
  password: string;
  email: string;
  personalKey: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserDocument extends IUser, Document {
  _id: string;
  isPasswordValid(plainPassword: string): Promise<boolean>;
  logout(): Promise<void>;
}

interface IUserModel extends Model<IUserDocument> {}

const userSchema = new Schema<IUserDocument, IUserModel>(
  {
    username: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      sparse: true,
      lowercase: true,
      trim: true,
    },
    personalKey: {
      type: String,
      required: true,
      unique: true,
      default: "-",
    },
  },
  {
    timestamps: true,
  }
);

function genPersonalKey(): Promise<string> {
  return bcrypt.genSalt(6);
}

userSchema.methods.isPasswordValid = async function (
  this: IUserDocument,
  plainPassword: string
) {
  return bcrypt.compare(plainPassword, this.password);
};

userSchema.pre("save", async function (this: IUserDocument) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  if (this.isNew) {
    this.personalKey = await genPersonalKey();
  }
});


userSchema.methods.logout = async function (this: IUserDocument) {
  this.personalKey = await genPersonalKey();
  await this.save();
};

export default model<IUserDocument, IUserModel>("User", userSchema, "users");
