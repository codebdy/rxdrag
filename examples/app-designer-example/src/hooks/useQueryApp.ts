import { IApp } from "../interfaces";

export function useQueryApp(id?: string): {
  app?: IApp,
  loading?: boolean,
} {
  return {
    app: {
      id: "app1",
      title: "火星改造项目"
    },
    loading: false,
  }
}