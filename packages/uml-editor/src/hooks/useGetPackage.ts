import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { packagesState } from './../recoil/atoms';
import { ID } from "@rxdrag/shared";

export function useGetPackage(metaId: ID) {
  const packages = useRecoilValue(packagesState(metaId));

  const getEntity = useCallback((uuid: string)=>{
    return packages.find((pkg) => pkg.uuid === uuid);
  }, [packages]);

  return getEntity;
}
