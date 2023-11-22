
import { useTranslate } from "@rxdrag/react-locales";
import { message } from "antd";
import { useCallback } from "react";
import { IAppJson } from "../interfaces";
import { saveFile } from "@rxdrag/shared";

export function useExportAppJson() {
  const  t  = useTranslate();
  const doExport = useCallback((app: IAppJson) => {

    saveFile(`app-${app.app?.id}`, JSON.stringify(app, null, 2)).then(
      (savedName) => {
        if (savedName) {
          message.success(t("OperateSuccess"))
        }
      }
    );
  }, [t]);

  return doExport
}