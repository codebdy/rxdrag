import { IOldControllerMeta } from "@rxdrag/minions-runtime-react";
import { useFieldPath, useForm } from "@rxdrag/react-fieldy";
import { useMemo } from "react";

export function useControllerKey(meta: IOldControllerMeta | undefined, schemaId?: string) {
  const path = useFieldPath()
  //内嵌form会重置path，list内部 rxid是一样的，所以要加form name来识别
  const form = useForm()
  return useMemo(() => {
    if (!meta) {
      return undefined;
    }
    //全局为schemaId
    if (meta?.global) {
      return schemaId
    }
    return schemaId ? `${form?.name || ""}-${path || ""}-${schemaId}` : undefined
  }, [form?.name, meta, path, schemaId])
}