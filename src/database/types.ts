export enum Environments {
  DEV = "DEV",
  QA = "QA",
  PROD = "PROD",
}

export interface DatabaseConfig {
  type: string;
  host: string;
  port: number;
  name: string;
  username: string;
  password: string;
  database: string;
  entities: string;
  migrations: string;
  synchronize: boolean;
  logging: boolean;
}
