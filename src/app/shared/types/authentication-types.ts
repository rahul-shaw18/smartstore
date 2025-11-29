export type LoginForm = {
  username: string;
  password: string;
};

export type LoginResponce = {
  accessToken: string;
  refreshToken: string;
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
};