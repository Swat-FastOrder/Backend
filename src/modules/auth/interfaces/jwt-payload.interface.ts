export interface IJwtPayload {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  iat?: Date;
}
