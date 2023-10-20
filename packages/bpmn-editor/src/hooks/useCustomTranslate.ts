import { useTranslate } from "@rxdrag/react-locales";
import { useCallback } from "react";

export function useCustomTranslate() {
  const t = useTranslate();

  const translate = useCallback((template: any, replacements: any) => {
    console.log("翻译遗漏追踪", t("AppBpmn." + template))
    template = t("AppBpmn." + template) || template;
    return template.replace(/{([^}]+)}/g, function (_: any, key: any) {
      return replacements[key] || '{' + key + '}';
    })
  }, [t]);

  return translate;
}