import prisma from "@/lib/prisma";
import ms from "ms";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

export const getHost = () => {
  return process.env.NEXT_PUBLIC_HOST || "http://localhost:3000";
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

export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<JSON> {
  const res = await fetch(input, init);

  if (!res.ok) {
    const json = await res.json();
    if (json.error) {
      const error = new Error(json.error) as Error & {
        status: number;
      };
      error.status = res.status;
      throw error;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }

  return res.json();
}

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
