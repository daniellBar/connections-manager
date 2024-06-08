export interface ConnectionRawData {
  id: number;
  name: string;
  url: string;
  username: string;
  password: string;
  type: string;
}

export interface ConnectionRecordDetails {
  id: number;
  name: string;
  username: string;
  type: string;
}

export enum ConnectionType {
  MYSQL = "mySql",
  TRINO = "trino",
  SNOWFLAKE = "snowflake",
}
