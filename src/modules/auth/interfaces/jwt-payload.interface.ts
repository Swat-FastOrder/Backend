export interface IJwtPayload {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  iat?: Date;
}
