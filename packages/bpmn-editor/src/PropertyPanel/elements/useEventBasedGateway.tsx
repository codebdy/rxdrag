import { useMemo } from "react";
import { IElement } from "./IElement";
import { useElementName } from "./useElementName";
import { useTranslate } from "@rxdrag/react-locales";

export function useEventBasedGateway(element: any, modeler: any): IElement {
  const t = useTranslate();

  const name = useElementName(element, modeler);
  const iElement: IElement = useMemo(() => {
    return {
      type: t("AppBpmn.Event based Gateway"),
      name: name,
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M16 0a1.29 1.29 0 00-.918.373L.371 15.084a1.316 1.316 0 00.002 1.834l14.71 14.709a1.313 1.313 0 001.833 0l14.711-14.711a1.316 1.316 0 00-.002-1.834L16.915.372A1.294 1.294 0 0016 0zm-.002 2.181l13.821 13.821-13.821 13.821-13.821-13.82L15.998 2.18zm0 5.876l-.254.185-7.377 5.355 2.915 8.964h9.433l2.915-8.964-7.631-5.54zm0 1.07l6.614 4.8-2.526 7.769h-8.175l-2.526-7.768 6.614-4.802z"></path></svg>,
    }
  }, [name, t]);

  return iElement;
}