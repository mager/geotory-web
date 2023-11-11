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

type DatasetUser = {
  image: string;
  slug: string;
};

export type DatasetTypeName = "geopackage" | "shapefile" | "geojson";
export type DatasetType = {
  name: DatasetTypeName;
};
export type DatasetT = {
  id: string;
  userId: string;
  name: string;
  slug: string;
  source: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  user: DatasetUser;
  image: string;
  types: DatasetType[];
};
