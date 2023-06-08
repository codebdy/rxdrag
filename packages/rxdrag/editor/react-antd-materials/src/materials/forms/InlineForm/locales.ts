import { formLocales } from "../Form/locales"

export const inlineFormLocales = {
  "zh-CN": {
    title: "内联表单",
    settings: {
      ...formLocales["zh-CN"].settings,
    }

  },
  'en-US': {
    title: "Form",
    settings: {
      settings: {
        ...formLocales["en-US"].settings,
      }
    }
  }
}

export const inlineFormResourceLocales = {
  "zh-CN": {
    "InlineForm": "内联表单",
  },
  'en-US': {
    "InlineForm": "Inline Form",
  }
}
