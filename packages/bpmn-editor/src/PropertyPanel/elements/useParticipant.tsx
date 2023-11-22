import { useMemo } from "react";
import { IElement } from "./IElement";
import { useElementName } from "./useElementName";
import { useTranslate } from "@rxdrag/react-locales";

export function useParticipant(element: any, modeler: any): IElement {
  const t = useTranslate();

  const name = useElementName(element, modeler);
  const iElement: IElement = useMemo(() => {
    return {
      type: t("AppBpmn.Participant"),
      name: name,
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M0 5v22.069h32V5H0zm30.276 1.684v18.82H6.62V6.684h23.655zm-28.62 0h3.31v18.82h-3.31V6.684z"></path></svg>,
    }
  }, [name, t]);

  return iElement;
}