import { useMemo } from "react";
import { IElement } from "./IElement";
import { useElementName } from "./useElementName";
import { useTranslate } from "@rxdrag/react-locales";

export function useCollapsedSubProcess(element: any, modeler: any): IElement {
  const t = useTranslate();
  const name = useElementName(element, modeler);
  const iElement: IElement = useMemo(() => {
    return {
      type: t("AppBpmn.Sub Process (collapsed)"),
      name: name,
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M5.637 3A5.644 5.644 0 000 8.637v15.417a5.644 5.644 0 005.637 5.637h20.726A5.644 5.644 0 0032 24.054V8.637A5.644 5.644 0 0026.363 3H5.637zm0 1.778h20.726a3.83 3.83 0 013.859 3.859v15.417a3.83 3.83 0 01-3.859 3.858h-4.201V16.695H9.838v11.217H5.637a3.83 3.83 0 01-3.859-3.858V8.637a3.83 3.83 0 013.859-3.859zm5.33 13.046h10.066v10.065H10.967V17.824zm4.189 1.431V22.06H12.35v1.689h2.804V26.554h1.69V23.749h2.804V22.06h-2.804V19.255h-1.69z"></path></svg>,
    }
  }, [name, t]);

  return iElement;
}