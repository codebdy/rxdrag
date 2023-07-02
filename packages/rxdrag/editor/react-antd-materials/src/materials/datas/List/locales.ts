import { sizeLocales } from "../../locales"

export const locales = {
  "zh-CN": {
    title: "列表",
    settings: {
      header: "页眉",
      footer: "页脚",
      bordered: "边框",
      split: "分割线",
      ...sizeLocales["zh-CN"],
    }

  },
  'en-US': {
    title: "List",
    settings: {
      header: "Header",
      footer: "Footer",
      bordered: "Bordered",
      split: "Split",
      ...sizeLocales["en-US"],
    }
  }
}

export const resourceLocales = {
  "zh-CN": {
    "List": "列表",
  },
  'en-US': {
    "List": "List",
  }
}
