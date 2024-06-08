import { ReactNode } from "react";
import { KeyValPair } from "./types";

export const generateMockId = (length: number = 8): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
};

export const convertArrayOfObjectsToKeyValPairs = (
  arrayOfObjects: Record<string, string | number | ReactNode>[]
): KeyValPair[] => {
  return arrayOfObjects
    .map((obj) => {
      return Object.entries(obj).map(([key, value]) => ({ k: key, v: value }));
    })
    .flat();
};