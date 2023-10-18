import { useCallback } from "react";
import { IPostOptions, usePostOne } from "enthooks/hooks/usePostOne";
import { IProcessCategoryInput } from "model";
import { IPageCategory } from "model";
import { useDesignerParams } from "plugin-sdk/contexts/desinger";

export function useUpsertCategory(options?: IPostOptions<any>): [
  (category: IProcessCategoryInput) => void,
  { loading?: boolean; error?: Error }
] {
  const params = useDesignerParams();

  const [post, { error, loading }] = usePostOne<IProcessCategoryInput, IPageCategory>("ProcessCategory",
    {
      ...options,
      fieldsGql: " name"
    }
  )

  const upsert = useCallback((process: IProcessCategoryInput) => {
    post({
      ...process,
      app: {
        sync: { id: params.app.id }
      },
    })
  }, [params.app.id, post]);

  return [upsert, { error: error, loading: loading }]
}