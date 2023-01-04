import { inputBaseLocales } from "../locales"

export const inputLocales = {
  "zh-CN": {
    title: "输入框",
    description: "普通输入框",
    settings: {
      ...inputBaseLocales['zh-CN'],
      addonAfter: "后置标签",
      addonBefore: "前置标签",
      maxLength: "最大长度",
      showCount: "显示字数",
      prefix: "前缀",
      suffix: "后缀",
      rows: "行数",
    }

  },
  'en-US': {
    title: "Input",
    settings: {
      ...inputBaseLocales['en-US'],
      addonAfter: "Addon After",
      addonBefore: "Addon Before",
      maxLength: "Max Length",
      showCount: "Show Count",
      prefix: "Prefix",
      suffix: "Suffix",
      rows: "Rows",
    }
  }
}

export const inputResourceLocales = {
  "zh-CN": {
    "Input": "输入框",
  },
  'en-US': {
    "Input": "Input",
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
