import { useCallback } from "react";
import { useTranslation } from "react-i18next";

export function useCustomTranslate() {
  const { t } = useTranslation();

  const translate = useCallback((template: any, replacements: any) => {
    console.log("翻译遗漏追踪", t("AppBpmn." + template))
    template = t("AppBpmn." + template) || template;
    return template.replace(/{([^}]+)}/g, function (_: any, key: any) {
      return replacements[key] || '{' + key + '}';
    })
  }, [t]);

  return translate;
}