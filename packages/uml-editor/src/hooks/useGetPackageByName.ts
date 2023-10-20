import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { packagesState } from './../recoil/atoms';
import { ID } from "@rxdrag/shared";

export function useGetPackageByName(metaId: ID) {
  const packages = useRecoilValue(packagesState(metaId));
  const getPackageByName = useCallback((name: string) => {
    return packages.find((pkg) => pkg.name === name);
  }, [packages]);

  return getPackageByName;
}
