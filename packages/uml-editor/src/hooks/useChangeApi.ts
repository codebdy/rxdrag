import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState, } from "recoil";
import { ID } from "shared";
import { apisState } from "../recoil/atoms";
import { useBackupSnapshot } from "./useBackupSnapshot";
import { MethodMeta } from "UmlEditor/meta";

export function useChangeApi(metaId: ID) {
  const backupSnapshot = useBackupSnapshot(metaId);
  const [apis, setApis] = useRecoilState(apisState(metaId));

  const { t } = useTranslation();

  const changeApi = useCallback(
    (method: MethodMeta) => {
      if (
        apis
          .filter((sc) => sc.uuid !== method.uuid)
          .find((sc) => sc.name === method.name)
      ) {
        return t("ErrorNameRepeat");
      }
      backupSnapshot();
      setApis((apis) =>
        apis.map((ent) => (ent.uuid === method.uuid ? method : ent))
      );
      return undefined;
    },
    [backupSnapshot, apis, setApis, t]
  );

  return changeApi;
}
