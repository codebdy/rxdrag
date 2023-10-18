import { useCallback } from "react";
import { IPostOptions, usePostOne } from "enthooks/hooks/usePostOne";
import { IProcessInput, IProcess } from "model/process";
import { useDesignerParams } from "plugin-sdk/contexts/desinger";

export function useUpsertProcess(options?: IPostOptions<any>): [
  (page: IProcessInput) => void,
  { loading?: boolean; error?: Error }
] {
  const params = useDesignerParams();

  const [post, { error, loading }] = usePostOne<IProcessInput, IProcess>("Process",
    {
      ...options,
    }
  )

  const upsert = useCallback((page: IProcessInput) => {
    post({
      ...page,
      app: {
        sync: { id: params.app.id }
      },
    })
  }, [params.app.id, post]);


  return [upsert, { error: error, loading: loading }]
}