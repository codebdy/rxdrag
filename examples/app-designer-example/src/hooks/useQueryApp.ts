import { app } from "../data";
import { IApp } from "../interfaces";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useQueryApp(id?: string): {
  app?: IApp,
  loading?: boolean,
} {
  return {
    app:app,
    loading: false,
  }
}