import { useCallback } from "react";
import { useMeta } from "./useMeta";
import { StereoType } from "@rxdrag/uml-schema";

export function useGetPackageEntities() {
  const meta = useMeta()
  const getPackageEntities = useCallback((id: string) => {
    return meta?.classes?.filter(cls => cls.stereoType === StereoType.Entity && cls.packageUuid === id)
  }, [meta?.classes])

  return getPackageEntities
}