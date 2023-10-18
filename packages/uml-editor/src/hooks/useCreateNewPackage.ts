import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { packagesState } from './../recoil/atoms';
import { useTranslate } from "@rxdrag/react-locales";
import { ID, createId } from "@rxdrag/shared";
import { PackageMeta } from "@rxdrag/uml-schema";

export function useCreateNewPackage(metaId: ID) {
  const packages = useRecoilValue(packagesState(metaId));
  const t = useTranslate();
  const getNewPackageName = useCallback(() => {
    const prefix = t("NewPackage");
    let index = 1;
    // eslint-disable-next-line no-loop-func
    while (packages.find((pkg) => pkg.name === (prefix + index))) {
      index++;
    }

    return prefix + index;
  }, [packages, t]);

  const createNewPackage = useCallback(
    () => {
      const newPackage: PackageMeta = {
        uuid: createId(),
        name: getNewPackageName(),
      };
      return newPackage;
    },
    [getNewPackageName]
  );

  return createNewPackage;
}
