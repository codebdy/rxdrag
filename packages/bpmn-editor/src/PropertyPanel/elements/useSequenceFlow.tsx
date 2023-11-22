import React from "react";
import { useMemo } from "react";
import { IElement } from "./IElement";
import { useElementName } from "./useElementName";
import { useTranslate } from "@rxdrag/react-locales";

export function useSequenceFlow(element: any, modeler: any): IElement {
  const t = useTranslate();

  const name = useElementName(element, modeler);
  const iElement: IElement = useMemo(() => {
    return {
      type: t("AppBpmn.Sequence Flow"),
      name: name,
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M32 .06S20.33 6.014 14.403 8.798c1.27 1.16 2.451 2.41 3.676 3.616L0 30.734 1.325 32l18.08-18.32c1.227 1.223 2.448 2.453 3.676 3.676C26.247 11.12 32 .06 32 .06z"></path></svg>,
    }
  }, [name, t]);

  return iElement;
}