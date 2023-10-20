import { useMemo } from "react";
import { IElement } from "./IElement";
import { useTranslate } from "@rxdrag/react-locales";

export function useAssociation(element: any, modeler: any): IElement {
  const  t  = useTranslate();

  const iElement: IElement = useMemo(() => {
    return {
      type: t("AppBpmn.Association"),
      name: false,
      icon: <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path stroke="#000" stroke-width="2" fill="none" stroke-dasharray="3.3,6" stroke-linecap="square" d="M1.5 30.5l29-29"></path></svg>,
    }
  }, [t]);

  return iElement;
}