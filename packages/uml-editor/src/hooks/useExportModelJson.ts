import { message } from "antd";
import { useCallback } from "react";
import { saveFile } from "./helper/saveFile";
import { useGetMeta } from "./useGetMeta";
import { MetaContent } from "../interfaces";
import { useTranslate } from "@rxdrag/react-locales";

export function useExportModelJson(metaId: string) {
  const t = useTranslate();
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