import React from "react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useParseLangMessage } from "plugin-sdk";
import { IElement } from "./IElement";
import { useElementName } from "./useElementName";

export function useLane(element: any, modeler: any): IElement {
  const { t } = useTranslation();
  const p = useParseLangMessage();
  const name = useElementName(element, modeler);
  const iElement: IElement = useMemo(() => {
    return {
      type: t("AppBpmn.Group"),
      name: p(name),
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M0 7v18.62h32V7H0zm1.655 17.056V8.684h28.62v15.372H1.656z"></path></svg>,
    }
  }, [name, p, t]);

  return iElement;
}