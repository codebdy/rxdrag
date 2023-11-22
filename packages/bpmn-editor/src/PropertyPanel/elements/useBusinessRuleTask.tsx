import React from "react";
import { useMemo } from "react";
import { IElement } from "./IElement";
import { useElementName } from "./useElementName";
import { useTranslate } from "@rxdrag/react-locales";

export function useBusinessRuleTask(element: any, modeler: any): IElement {
  const t = useTranslate();
  const name = useElementName(element, modeler);
  const iElement: IElement = useMemo(() => {
    return {
      type: t("AppBpmn.Business Rule Task"),
      name: name,
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M6.494 3C2.916 3 0 5.903 0 9.475v13.383c0 3.572 2.916 6.475 6.494 6.475h19.012c3.578 0 6.494-2.903 6.494-6.475V9.475C32 5.903 29.084 3 25.506 3H6.494zm0 2h19.012C28.015 5 30 6.98 30 9.475v13.383c0 2.495-1.985 4.475-4.494 4.475H6.494C3.985 27.333 2 25.353 2 22.858V9.475C2 6.98 3.985 5 6.494 5zM5.296 7.398v12.665h16.87V7.398H5.296zm.718 4.386h15.433v3.44H9.985v-3.432h-.719v3.431H6.014v-3.44zm0 4.158h3.252v3.403H6.014v-3.403zm3.97 0h11.463v3.403H9.985v-3.403z"></path><path d="M6.079 8.209v3.587H21.44V8.209z"></path></svg>,
    }
  }, [name, t]);

  return iElement;
}