import { sizeLocales } from "../../locales"

export const locales = {
  "zh-CN": {
    title: "表格",
    settings: {
      header: "页眉",
      footer: "页脚",
      bordered: "边框",
      summary: "概要",
      ...sizeLocales["zh-CN"],
    }

  },
  'en-US': {
    title: "Table",
    settings: {
      header: "Header",
      footer: "Footer",
      bordered: "Bordered",
      summary: "Summary",
      ...sizeLocales["en-US"],
    }
  }
}

export const resourceLocales = {
  "zh-CN": {
    "Table": "表格",
  },
  'en-US': {
    "Table": "Table",
  }
}
