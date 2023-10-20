import { useMemo } from "react";
import { IElement } from "./IElement";
import { useElementName } from "./useElementName";
import { useTranslate } from "@rxdrag/react-locales";

export function useTextAnnotation(element: any, modeler: any): IElement {
  const t = useTranslate();
  const name = useElementName(element, modeler);
  const iElement: IElement = useMemo(() => {
    return {
      type: t("AppBpmn.Text Annotation"),
      name: name,
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M22.087 0v31.647H32v-1.788h-8.125V1.788H32V0h-9.913zm-2.924 13.999l-2.737 2.167 2.167 2.738 2.738-2.167-2.168-2.738zm-5.475 4.335L10.95 20.5l2.168 2.738 2.737-2.168-2.167-2.737zm-5.475 4.335l-2.738 2.167 2.168 2.738 2.737-2.168-2.167-2.737zm-5.476 4.335L0 29.17l2.167 2.738 2.738-2.168-2.168-2.737z"></path></svg>,
    }
  }, [name, t]);

  return iElement;
}