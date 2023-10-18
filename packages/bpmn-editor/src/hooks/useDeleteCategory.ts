import { ID } from "shared";
import { IDeleteOptions, useDeleteById } from "enthooks/hooks/useDeleteById";
import { IProcessCategory } from "model";

export function useDeleteCategory(options?: IDeleteOptions<IProcessCategory>): [
  (id: ID) => void,
  {
    error?: Error,
    loading?: boolean,
  }
] {
  const [doDelete, { error, loading }] = useDeleteById<IProcessCategory>("ProcessCategory",
    {
      ...options
    }
  );

  return [doDelete, { error: error, loading: loading }]
}