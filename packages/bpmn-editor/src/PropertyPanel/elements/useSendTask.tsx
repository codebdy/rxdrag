import { useMemo } from "react";
import { IElement } from "./IElement";
import { useElementName } from "./useElementName";
import { useTranslate } from "@rxdrag/react-locales";

export function useSendTask(element: any, modeler: any): IElement {
  const t = useTranslate();
  const name = useElementName(element, modeler);
  const iElement: IElement = useMemo(() => {
    return {
      type: t("AppBpmn.Send Task"),
      name: name,
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M6.494 3C2.916 3 0 5.903 0 9.475v13.383c0 3.572 2.916 6.475 6.494 6.475h19.012c3.578 0 6.494-2.903 6.494-6.475V9.475C32 5.903 29.084 3 25.506 3H6.494zm0 2h19.012C28.015 5 30 6.98 30 9.475v13.383c0 2.495-1.985 4.475-4.494 4.475H6.494C3.985 27.333 2 25.353 2 22.858V9.475C2 6.98 3.985 5 6.494 5zm-1.38 3.16l8.332 4.717L21.78 8.16H5.114zm.021 1.745v9.309H21.8V9.905l-8.353 4.655-8.31-4.655z"></path></svg>,
    }
  }, [name, t]);

  return iElement;
}