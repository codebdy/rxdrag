import { useMemo } from "react";
import { IElement } from "./IElement";
import { useTranslate } from "@rxdrag/react-locales";

export function useCollaboration(element: any, modeler: any): IElement {
  const t = useTranslate();
  const iElement: IElement = useMemo(() => {
    return {
      type: t("AppBpmn.Collaboration"),
      name: false,
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><g fill-rule="evenodd"><path fill-rule="nonzero" d="M0 0v8.62h32V0H0zm1.655 7.054v-5.37h28.62v5.37H1.656zM0 23.38V32h32v-8.62H0zm1.655 7.054v-5.37h28.62v5.37H1.656z"></path><path d="M24 8l4 7h-8l4-7zm0 2l-2.28 4h4.56L24 10zM23.5 21h1v3h-1zM23.5 15h1v3h-1zM8 24l-4-7h8l-4 7zm0-2l2.28-4H5.72L8 22zM7.5 8h1v3h-1zM7.5 14h1v3h-1z"></path></g></svg>,
    }
  }, [t]);

  return iElement;
}