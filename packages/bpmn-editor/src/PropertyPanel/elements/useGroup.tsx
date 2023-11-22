import { useMemo } from "react";
import { IElement } from "./IElement";
import { useElementName } from "./useElementName";
import { useTranslate } from "@rxdrag/react-locales";

export function useGroup(element: any, modeler: any): IElement {
  const t = useTranslate();
  const name = useElementName(element, modeler);
  const iElement: IElement = useMemo(() => {
    return {
      type: t("AppBpmn.Group"),
      name: name,
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M6.34.016c-2.333.025-4.684 1.77-5.29 4.17C.608 5.848.88 7.608.804 9.314v2.922h2.041c.038-2.332-.076-4.673.062-7C3.14 3.355 4.869 1.938 6.643 2.04h8.956V.009c-3.086 0-6.173-.02-9.258 0v.007zm13.094 2.023h1.92V.009h-1.92v2.03zm5.756 0c1.265-.069 2.66.045 3.602 1.055 1.036.983 1.201 2.523 1.122 3.91v6.313h2.078c-.03-2.677.062-5.36-.047-8.032-.17-2.743-2.62-5.111-5.215-5.236-.511-.064-1.027-.02-1.54-.033v2.023zM.803 18.319h2.041v-2.026H.804v2.026zm29.11 1.084h2.08v-2.03h-2.08v2.03zM.804 26.148c.004 2.218 1.393 4.366 3.313 5.28 1.728.853 3.681.448 5.521.544.43-.112 1.29.231 1.435-.183v-1.847c-1.788-.043-3.584.094-5.365-.082-1.67-.354-2.919-2.048-2.863-3.844v-3.644H.804v3.777zm29.11-.068c.04 1.961-1.508 3.787-3.381 3.842-1.954.06-3.914.02-5.87.026v2.03c2.118-.042 4.242.08 6.355-.063 2.524-.264 4.818-2.644 4.94-5.323.08-1.039.014-2.085.035-3.126h-2.078v2.613zm-15.006 5.898h1.92v-2.03h-1.92v2.03z"></path></svg>,
    }
  }, [name, t]);

  return iElement;
}