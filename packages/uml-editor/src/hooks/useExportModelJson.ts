import { message } from "antd";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { MetaContent } from "../meta";
import { saveFile } from "./helper/saveFile";
import { useGetMeta } from "./useGetMeta";

export function useExportModelJson(metaId: string) {
  const { t } = useTranslation();
  const getMeta = useGetMeta(metaId)
  const doExport = useCallback(() => {

    const data: MetaContent = getMeta();
    saveFile(metaId + '-model', JSON.stringify(data, null, 2)).then(
      (savedName) => {
        if (savedName) {
          message.success(t("OperateSuccess"))
        }
      }
    );
  }, [metaId, getMeta, t]);

  return doExport
}