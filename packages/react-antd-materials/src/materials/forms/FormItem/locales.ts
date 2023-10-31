import { fieldDisplayLocales } from "../../common/Form/locales"

export const formItemLocales = {
  "zh-CN": {
    title: "表单条目",
    settings: {
      colon: "冒号",
      label: "标签文本",
      labelAlign: "标签对齐",
      labelWrap: "标签换行",
      labelCol: "标签列",
      wrapperCol: "控件布局",
      span: "跨度",
      offset: "偏移",
      order: "顺序",
      pull: "左移",
      push: "右移",
      left: "左",
      right: "右",
      ...fieldDisplayLocales["zh-CN"],
    }

  },
  'en-US': {
    title: "Form Item",
    settings: {
      colon: "Colon",
      label: "Label",
      labelAlign: "Label Align",
      labelWrap: "Label Wrap",
      labelCol: "Label Col",
      wrapperCol: "Wrapper Col",
      span: "Span",
      offset: "Offset",
      order: "Order",
      pull: "Pull",
      push: "Push",
      left: "Left",
      right: "Right",
      ...fieldDisplayLocales["en-US"],
    }
  }
}


export const formItemResourceLocales = {
  "zh-CN": {
    "FormItem": "表单条目",
  },
  'en-US': {
    "FormItem": "FormItem",
  }
}
