import jwt from "jsonwebtoken";
interface IUserPayload {
  _id: string;
  username: string;
}
class JwtService {
  
  sign(payload: any, personalKey: string): string {
    return jwt.sign(payload, this.createSecretString(personalKey), {
      expiresIn: '1d',
    }) as string;
  }

  verify(token: string, personalKey: string): IUserPayload {
    return (jwt.verify(
      token,
      this.createSecretString(personalKey)
    ) as unknown) as IUserPayload;
  }

  decodePayload(token: string): IUserPayload {
    return (jwt.decode(token) as unknown) as IUserPayload;
  }

  private createSecretString(personalKey: string): string {
    return `${process.env.SECRET}${personalKey}`;
  }
}

export default new JwtService();
