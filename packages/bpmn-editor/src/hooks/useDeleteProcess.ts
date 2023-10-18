import { ID } from "shared";
import { IDeleteOptions, useDeleteById } from "enthooks/hooks/useDeleteById";
import { IProcess } from "model/process";

export function useDeleteProcess(options?: IDeleteOptions<IProcess>): [
  (id: ID) => void,
  {
    error?: Error,
    loading?: boolean,
  }
] {
  const [doDelete, { error, loading }] = useDeleteById<IProcess>("Process",
    {
      ...options
    }
  );

  return [doDelete, { error: error, loading: loading }]
}