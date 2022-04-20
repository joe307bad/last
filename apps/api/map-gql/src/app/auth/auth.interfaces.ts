export type AuthenticatedUser = {
  id: string;
  username: string;
};
export type JwtPayload = {
  sub: number;
  username: string;
};

export type UserContext = {
  req: {
    user: AuthenticatedUser;
  };
};
