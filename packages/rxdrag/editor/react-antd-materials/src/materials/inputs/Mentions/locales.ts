import { inputBaseLocales } from "../locales"

export const mentionsLocales = {
  "zh-CN": {
    title: "提及",
    settings: {
      ...inputBaseLocales['zh-CN'],
      maxLength: "最大长度",
      showCount: "显示字数",
    }

  },
  'en-US': {
    title: "Mentions",
    settings: {
      ...inputBaseLocales['en-US'],
      maxLength: "Max Length",
      showCount: "Show Count",
    }
  }
}

export const mentionsResourceLocales = {
  "zh-CN": {
    "Mentions": "提及",
  },
  'en-US': {
    "Mentions": "Mentions",
  }
}

export const textareaResourceLocales = {
  "zh-CN": {
    "TextArea": "多行输入框",
  },
  'en-US': {
    "TextArea": "TextArea",
  }
}
