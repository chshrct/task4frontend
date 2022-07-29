export type UserType = {
  id: string;
  name: string;
  email: string;
  logDate: string;
  regDate: string;
  status: StatusType;
};

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
  id: string;
  email: string;
};

export type StatusType = 'active' | 'blocked';
