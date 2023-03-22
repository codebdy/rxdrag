import { typographyLocales } from "../locales"

export const locales = {
  "zh-CN": {
    title: "标题",
    settings: {
      ...typographyLocales["zh-CN"],
      level: "级别",
    }

  },
  'en-US': {
    title: "Text view",
    settings: {
      ...typographyLocales["en-US"],
      level: "level",
    }
  }
}


export const resourceLocales = {
  "zh-CN": {
    "Title": "标题",
  },
  'en-US': {
    "Title": "Title",
  }
}
