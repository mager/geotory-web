export type User = {
  id: string;
  name: string;
  slug: string;
  email: string;
  emailVerified: boolean;
  image: string;
};

export type UpdateUsername = {
  username: string;
};
