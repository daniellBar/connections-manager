import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { ConnectionRawData } from "./types";

const connectionsUrl = "http://localhost:4000/databases";

export const getConnections = () => {
  return axios.get(connectionsUrl);
};

export const useGetConnections = (
  options?: Omit<
    UseQueryOptions<
      AxiosResponse<{
        data: ConnectionRawData[];
      }>,
      Error,
      AxiosResponse<ConnectionRawData[]>,
      ["connections"]
    >,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery({
    queryKey: ["connections"],
    queryFn: () => getConnections(),
    ...options,
  });
};

export const createConnection = (body: any) => {
  return axios.post(connectionsUrl, body);
};

export const getConnection = (id: string) =>
  axios.get(`${connectionsUrl}/${id}`);

export const useGetConnection = (
  id: string,
  options?: Omit<
    UseQueryOptions<
      AxiosResponse<{
        data: ConnectionRawData;
      }>,
      Error,
      AxiosResponse<ConnectionRawData>
    >,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery({
    queryKey: ["connection", id],
    queryFn: () => getConnection(id),
    ...options,
  });
};
