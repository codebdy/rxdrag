import React from "react";
import { useMemo } from "react";
import { IElement } from "./IElement";
import { useElementName } from "./useElementName";
import { useTranslate } from "@rxdrag/react-locales";

export function useStartEvent(element: any, modeler: any): IElement {
  const t = useTranslate();
  const name = useElementName(element, modeler);
  const iElement: IElement = useMemo(() => {
    return {
      type: t("AppBpmn.Start Event"),
      name: name,
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M15.847.004C9.61-.016 3.624 4.014 1.257 9.78-1.235 15.49.06 22.581 4.42 27.034c4.193 4.513 11.101 6.17 16.887 4.058 5.996-2.042 10.423-7.93 10.664-14.268.403-6.228-3.26-12.441-8.87-15.154A15.924 15.924 0 0015.846.004zm.439 1.729c6.105.033 11.856 4.45 13.435 10.359 1.678 5.653-.592 12.198-5.463 15.547-5.06 3.719-12.564 3.45-17.343-.625-4.814-3.84-6.538-10.94-4.067-16.57 2.14-5.206 7.515-8.775 13.147-8.71.097-.001.194-.002.29-.001z"></path></svg>,
    }
  }, [name, t]);

  return iElement;
}