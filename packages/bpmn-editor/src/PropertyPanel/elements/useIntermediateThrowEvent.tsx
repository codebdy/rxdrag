import { useMemo } from "react";
import { IElement } from "./IElement";
import { useElementName } from "./useElementName";
import { useTranslate } from "@rxdrag/react-locales";

export function useIntermediateThrowEvent(element: any, modeler: any): IElement {
  const t = useTranslate();

  const name = useElementName(element, modeler);
  const iElement: IElement = useMemo(() => {
    return {
      type: t("AppBpmn.Intermediate Throw Event"),
      name: name,
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M15.848.001C8.113-.093.931 6.281.125 13.983c-.855 6.55 2.741 13.46 8.74 16.314 5.666 2.847 13.012 1.99 17.71-2.33 4.745-4.162 6.727-11.243 4.532-17.207C29.105 4.938 23.55.48 17.367.06A16.448 16.448 0 0015.848 0v.001zm.293 1.727c7.113-.099 13.662 5.97 14.077 13.08.56 6.299-3.516 12.735-9.582 14.679-5.798 2.004-12.806-.12-16.283-5.237C.717 19.159.874 11.638 5.016 6.876 7.722 3.638 11.902 1.63 16.14 1.728zm-.415 1.555C9.157 3.258 3.256 9.156 3.278 15.729c-.16 5.965 4.365 11.725 10.293 12.737 5.409 1.065 11.37-1.744 13.775-6.753 2.534-4.986 1.386-11.627-2.953-15.251-2.364-2.077-5.512-3.27-8.667-3.18zm.507 1.692c5.82-.026 11.013 5.318 10.79 11.143-.024 5.3-4.313 10.267-9.636 10.803-5.075.667-10.426-2.588-11.885-7.553-1.535-4.744.494-10.46 4.925-12.885a11.072 11.072 0 015.806-1.508z"></path></svg>,
    }
  }, [name, t]);

  return iElement;
}