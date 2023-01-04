import { inputBaseLocales } from "../locales"

export const selectLocales = {
  "zh-CN": {
    title: "下拉框",
    description: "下拉框",
    settings: {
      ...inputBaseLocales['zh-CN'],
    }

  },
  'en-US': {
    title: "Select",
    settings: {
      ...inputBaseLocales['en-US'],
    }
  }
}

export const selectResourceLocales = {
  "zh-CN": {
    "Select": "下拉框",
  },
  'en-US': {
    "Select": "Select",
  }
}
