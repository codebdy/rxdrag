import { sizeLocales } from "../locales";

export const inputBaseLocales = {
  "zh-CN": {
    disabled: "无效",
    autoFocus: "自动聚焦",
    allowClear: "允许清除",
    bordered: "显示边框",
    defaultValue: "默认值",
    placeholder: "占位符",
    ...sizeLocales["zh-CN"]
  },
  'en-US': {
    disabled: "Disabled",
    autoFocus: "Auto Focus",
    allowClear: "Allow Clear",
    bordered: "Bordered",
    defaultValue: "Default Value",
    placeholder: "Placeholder",
    ...sizeLocales["en-US"]
  }
}