import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import ms from "ms";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { getServerSession } from "next-auth/next";
import { DatasetT } from "@/app/types";

export const getHost = () => {
  return process.env.NEXT_PUBLIC_HOST || "https://api.geotory.com";
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const timeAgo = (timestamp: Date, timeOnly?: boolean): string => {
  if (!timestamp) return "never";
  return `${ms(Date.now() - new Date(timestamp).getTime())}${
    timeOnly ? "" : " ago"
  }`;
};

export function nFormatter(num: number, digits?: number) {
  if (!num) return "0";
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "K" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits || 1).replace(rx, "$1") + item.symbol
    : "0";
}

export function capitalize(str: string) {
  if (!str || typeof str !== "string") return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const truncate = (str: string, length: number) => {
  if (!str || str.length <= length) return str;
  return `${str.slice(0, length)}...`;
};

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.image) {
    return null;
  }

  // Fetch the user from prisma
  const user = await prisma?.user.findUnique({
    where: { email: session.user.email as string },
  });
  return user;
}

export async function getUser(username: string) {
  const user = await prisma?.user.findUnique({
    where: { slug: username },
  });
  return user;
}

// @ts-ignore
export const post = async (url: string, data: any) => {
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

export const getDatasetLink = (username: string | null, slug: string) => {
  return `/${username}/${slug}`;
};

export const getDatasetSource = (source: string) => {
  // Example input: https://github.com/mager/maps/tree/main/illinois
  // Example output: mager/maps/illinois
  const parts = source.split("/");
  const githubIndex = parts.findIndex((part) => part === "github.com");
  const owner = parts[githubIndex + 1];
  const repo = parts[githubIndex + 2];
  // Path should be everything after tree/main
  const pathIndex = parts.findIndex((part) => part === "tree");
  const path = parts.slice(pathIndex + 2).join("/");
  return `${owner}/${repo}/${path}`;
};

export const getImageURL = (dataset: DatasetT) => {
  const parts = dataset.source.split("/");
  const owner = parts[0];
  const repo = parts[1];
  const path = parts.slice(2).join("/");

  return `https://raw.githubusercontent.com/${owner}/${repo}/main/${path}/${dataset.image}`;
};

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
};
