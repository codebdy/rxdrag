import { sizeLocales } from "../../locales"

export const locales = {
  "zh-CN": {
    title: "表格概要",
    settings: {

    }

  },
  'en-US': {
    title: "Table Summary",
    settings: {
      header: "Header",
      footer: "Footer",
      bordered: "Bordered",
      split: "Split",
      ...sizeLocales["en-US"],
    }
  }
}
