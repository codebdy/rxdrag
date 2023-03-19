import { typographyLocales } from "../locales"

export const locales = {
  "zh-CN": {
    title: "链接",
    settings: {
      ...typographyLocales["zh-CN"],
      href: "链接",
      target: "目标窗口",
    }

  },
  'en-US': {
    title: "Link",
    settings: {
      ...typographyLocales["en-US"],
      href: "Href",
      target: "Target",
    }
  }
}


export const resourceLocales = {
  "zh-CN": {
    "Link": "链接",
  },
  'en-US': {
    "Link": "Link",
  }
}
