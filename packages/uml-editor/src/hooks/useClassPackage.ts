import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { packagesState } from "../recoil/atoms";
import { ClassMeta } from "@rxdrag/uml-schema";

export function useClassPackage(metaId: string){
  const packages = useRecoilValue(packagesState(metaId))
  const getPackage = useCallback((cls: ClassMeta)=>{
    return packages.find(pkg=>pkg.uuid === cls.packageUuid)
  }, [packages])

  return getPackage
}