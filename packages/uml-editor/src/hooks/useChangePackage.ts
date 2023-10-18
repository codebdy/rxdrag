import { useCallback } from "react"
import { useSetRecoilState } from "recoil";
import { useMetaId } from "../hooks/useMetaId";
import { PackageMeta } from "../meta/PackageMeta";
import { packagesState } from "../recoil/atoms";

export function useChangePackage() {
  const metaId = useMetaId();
  const setPackages = useSetRecoilState(packagesState(metaId));
  const change = useCallback((pkg: PackageMeta) => {
    setPackages(packages => packages.map(pg => pg.uuid === pkg.uuid ? pkg : pg))
  }, [setPackages])

  return change;
}