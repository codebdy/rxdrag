import { fieldDisplayLocales } from "../../common/Form/locales"
import { sizeLocales } from "../../locales"
import { filedyLocales } from "../fieldyLoacles"

export const formLocales = {
  "zh-CN": {
    title: "表单",
    settings: {
      colon: "冒号",
      disabled: "禁用",
      labelAlign: "标签对齐",
      labelWrap: "标签换行",
      labelCol: "标签列",
      wrapperCol: "控件布局",
      layout: "表单布局",
      right: "右对齐",
      left: "左对齐",
      span: "跨度",
      offset: "偏移",
      order: "顺序",
      pull: "左移",
      push: "右移",
      ...sizeLocales["zh-CN"],
      ...filedyLocales["zh-CN"],
      ...fieldDisplayLocales["zh-CN"],
      reset: "重置",
    }

  },
  'en-US': {
    title: "Form",
    settings: {
      colon: "Colon",
      disabled: "Disabled",
      labelAlign: "Label Align",
      labelWrap: "Label Wrap",
      labelCol: "Label Col",
      wrapperCol: "Wrapper Col",
      layout: "layout",
      right: "Right",
      left: "Left",
      span: "Span",
      offset: "Offset",
      order: "Order",
      pull: "Pull",
      push: "Push",
      ...sizeLocales["en-US"],
      ...filedyLocales["en-US"],
      ...fieldDisplayLocales["en-US"],
      reset: "Reset"
    }
  }
}


export const formResourceLocales = {
  "zh-CN": {
    "Form": "表单",
  },
  'en-US': {
    "Form": "Form",
  }
}
