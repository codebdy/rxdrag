import { useMemo } from "react";
import { useMeta } from "./useMeta";
import { StereoType } from "@rxdrag/uml-schema";

export function useEntities() {
  const meta = useMeta()
  const entities = useMemo(() => {
    return meta?.classes?.filter(cls => cls.stereoType === StereoType.Entity)
  }, [meta?.classes])
  return entities
}