import { Dataset } from "@prisma/client";
import type { FeatureCollection } from "geojson";

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

export type DeleteDatasetResp = {
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
  geojson: FeatureCollection;
  centroid: [number, number];
  zoom: number;
};
