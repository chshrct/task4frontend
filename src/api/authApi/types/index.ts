export type SignInResponseType = {
  id: string;
  email: string;
  token: string;
};

export type SignInQueryType = {
  email: string;
  password: string;
};

export type SignUpResponseType = {
  done: true;
};

export type SignUpQueryType = SignInQueryType & { name: string };

export type AuthCheckResponseType = {
  _id: string;
  email: string;
  iat: number;
  exp: number;
};
