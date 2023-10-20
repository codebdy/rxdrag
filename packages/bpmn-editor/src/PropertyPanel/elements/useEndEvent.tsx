import { useMemo } from "react";
import { IElement } from "./IElement";
import { useElementName } from "./useElementName";
import { useTranslate } from "@rxdrag/react-locales";

export function useEndEvent(element: any, modeler: any): IElement {
  const t = useTranslate();

  const name = useElementName(element, modeler);
  const iElement: IElement = useMemo(() => {
    return {
      type: t("AppBpmn.End Event"),
      name: name,
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M15.84.042C8.654-.01 1.913 5.437.4 12.454-1.057 18.62 1.554 25.495 6.784 29.09c5.076 3.636 12.31 3.92 17.59.544 5.309-3.251 8.435-9.744 7.445-15.921C30.91 7.307 25.795 1.738 19.442.422a16.064 16.064 0 00-3.602-.38zm.382 5.01c5.28-.017 10.13 4.353 10.669 9.61.687 5.025-2.552 10.281-7.423 11.792-4.754 1.617-10.486-.447-12.962-4.856-2.74-4.575-1.574-11.094 2.768-14.27a11.05 11.05 0 016.948-2.276z"></path></svg>,
    }
  }, [name, t]);

  return iElement;
}