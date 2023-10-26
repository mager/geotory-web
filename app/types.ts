import { Dataset } from "@prisma/client";

export type User = {
  id: string;
  name: string;
  slug: string;
  email: string;
  emailVerified: boolean;
  image: string;
};

export type UpdateUsernameReq = {
  username: string;
};

export type UpdateUsernameResp = {
  user: User;
};

export type CreateDatasetResp = {
  dataset: Dataset;
};
