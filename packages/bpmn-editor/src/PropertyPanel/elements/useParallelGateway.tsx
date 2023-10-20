import React from "react";
import { useMemo } from "react";
import { IElement } from "./IElement";
import { useElementName } from "./useElementName";
import { useTranslate } from "@rxdrag/react-locales";

export function useParallelGateway(element: any, modeler: any): IElement {
  const t = useTranslate();

  const name = useElementName(element, modeler);
  const iElement: IElement = useMemo(() => {
    return {
      type: t("AppBpmn.Parallel Gateway"),
      name: name,
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M16.001 0a1.29 1.29 0 00-.917.373L.373 15.084a1.316 1.316 0 00.002 1.834l14.71 14.709a1.313 1.313 0 001.833 0l14.711-14.711a1.316 1.316 0 00-.002-1.834L16.917.372A1.294 1.294 0 0016.002 0zM16 2.181l13.821 13.821L16 29.823 2.179 16.003 16 2.18zm-.377 5.708l-.168.032-.136.092-.096.14-.032.168v6.868h-6.87l-.002-.002-.166.037-.137.092v-.002l-.095.141-.033.167v.753s.032.169.034.17l.094.138.138.092.167.036h6.87v6.867l-.001-.001.033.17.095.138.138.092s.166.035.167.037h.752l.17-.036.137-.092.095-.137.033-.17v-6.867h6.868l.17-.035.137-.092.095-.137.033-.17v-.753s-.033-.165-.032-.167l-.096-.14-.138-.093s-.17-.037-.17-.035H16.81V8.323l-.033-.168-.094-.14-.138-.092-.17-.034h-.752z"></path></svg>,
    }
  }, [name, t]);

  return iElement;
}