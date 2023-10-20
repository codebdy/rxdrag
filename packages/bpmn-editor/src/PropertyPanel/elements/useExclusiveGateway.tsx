import { useMemo } from "react";
import { IElement } from "./IElement";
import { useElementName } from "./useElementName";
import { useTranslate } from "@rxdrag/react-locales";

export function useExclusiveGateway(element: any, modeler: any): IElement {
  const t = useTranslate();
  const name = useElementName(element, modeler);
  const iElement: IElement = useMemo(() => {
    return {
      type: t("AppBpmn.Exclusive Gateway"),
      name: name,
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M16 0a1.29 1.29 0 00-.918.373L.371 15.084a1.316 1.316 0 00.002 1.834l14.71 14.709a1.313 1.313 0 001.833 0l14.711-14.711a1.316 1.316 0 00-.002-1.834L16.915.372A1.294 1.294 0 0016 0zm-.002 2.181l13.821 13.821-13.821 13.821-13.821-13.82L15.998 2.18zm-5.162 7.69l-.166.032-.141.096-.532.532s-.097.142-.097.144l-.03.164.032.162.093.144 4.857 4.858-4.855 4.855v-.001L9.9 21l-.03.164.032.162s.093.142.093.144l.531.532.146.095.162.032.164-.03.144-.097 4.855-4.856 4.857 4.857.145.095.162.032.164-.03.144-.097.531-.532.095-.14.033-.168-.033-.162-.095-.146L17.144 16 22 11.144l.095-.14.033-.166-.033-.163-.097-.144-.532-.532-.14-.095-.163-.032-.166.032-.141.095L16 14.855l-4.858-4.858v-.002l-.144-.092-.162-.032z"></path></svg>,
    }
  }, [name, t]);

  return iElement;
}