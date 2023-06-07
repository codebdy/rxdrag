import { IControllerMeta } from "@rxdrag/minions-runtime-react";
import { useFieldPath } from "@rxdrag/react-fieldy";
import { useMemo } from "react";

export function useControllerKey(meta: IControllerMeta | undefined, schemaId?: string) {
  const path = useFieldPath()

  return useMemo(() => {
    if (!meta) {
      return undefined;
    }
    //全局为schemaId
    if (meta?.global) {
      return schemaId
    }
    return schemaId ? `${path || ""}-${schemaId}` : undefined
  }, [meta, path, schemaId])
}