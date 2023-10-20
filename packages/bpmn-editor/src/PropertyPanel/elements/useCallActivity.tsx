import { useMemo } from "react";
import { IElement } from "./IElement";
import { useElementName } from "./useElementName";
import { useTranslate } from "@rxdrag/react-locales";

export function useCallActivity(element: any, modeler: any): IElement {
  const t = useTranslate();
  const name = useElementName(element, modeler);
  const iElement: IElement = useMemo(() => {
    return {
      type: t("AppBpmn.Call Activity"),
      name: name,
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M24.978 3c3.761 0 6.89 2.979 7.018 6.695l.004.238V22.4c0 3.747-3.05 6.804-6.783 6.93l-.24.003H7.023c-3.761 0-6.89-2.978-7.018-6.695L0 22.4V9.933C0 6.187 3.05 3.13 6.783 3.004L7.023 3h17.955zm0 3.667H7.022c-1.842 0-3.255 1.344-3.35 3.079l-.005.187V22.4c0 1.761 1.35 3.167 3.16 3.262l.195.005L10 25.666V15h12v10.666h2.978c1.842 0 3.255-1.344 3.35-3.079l.005-.187V9.933c0-1.761-1.35-3.166-3.16-3.261l-.195-.005zm-3.732 9.087H10.754v9.912h10.491v-9.912zm-4.475 1.817v2.658h2.658v1.542H16.77v2.658H15.23V21.77H12.57V20.23h2.658V17.57h1.542z"></path></svg>,
    }
  }, [name, t]);

  return iElement;
}