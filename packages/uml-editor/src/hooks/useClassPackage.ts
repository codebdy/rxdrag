import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { ClassMeta } from "../meta/ClassMeta";
import { packagesState } from "../recoil/atoms";

export function useClassPackage(metaId: string){
  const packages = useRecoilValue(packagesState(metaId))
  const getPackage = useCallback((cls: ClassMeta)=>{
    return packages.find(pkg=>pkg.uuid === cls.packageUuid)
  }, [packages])

  return getPackage
}