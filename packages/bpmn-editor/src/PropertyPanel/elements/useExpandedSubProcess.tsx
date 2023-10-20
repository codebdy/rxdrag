import React from "react";
import { useMemo } from "react";
import { IElement } from "./IElement";
import { useElementName } from "./useElementName";
import { useTranslate } from "@rxdrag/react-locales";

export function useExpandedSubProcess(element: any, modeler: any): IElement {
  const t = useTranslate();
  const name = useElementName(element, modeler);
  const iElement: IElement = useMemo(() => {
    return {
      type: t("AppBpmn.Sub Process (expanded)"),
      name: name,
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M5.636 3A5.642 5.642 0 000 8.636v15.418a5.643 5.643 0 005.636 5.636h20.728A5.643 5.643 0 0032 24.054V8.636A5.642 5.642 0 0026.364 3H5.636zm0 1.778h20.728a3.83 3.83 0 013.858 3.858v15.418a3.83 3.83 0 01-3.858 3.858h-4.203V16.723H9.84v11.189H5.636a3.83 3.83 0 01-3.858-3.858V8.636a3.83 3.83 0 013.858-3.858zm5.331 13.074h10.066v10.06H10.967v-10.06zm1.336 3.996v1.711h7.394v-1.71h-7.394z"></path></svg>,
    }
  }, [name, t]);

  return iElement;
}