import { sizeLocales } from "../../locales"

export const locales = {
  "zh-CN": {
    title: "表格",
    settings: {
      header: "页眉",
      footer: "页脚",
      bordered: "边框",
      summary: "概要",
      pagination: "分页",
      false: "不显示",
      topLeft: "左上",
      topCenter: "中上",
      topRight: "右上",
      bottomLeft: "左下",
      bottomCenter: "中下",
      bottomRight: "右下",
      rowKey: "行主键",
      ...sizeLocales["zh-CN"],
    }

  },
  'en-US': {
    title: "Table",
    settings: {
      header: "Header",
      footer: "Footer",
      bordered: "Bordered",
      summary: "Summary",
      pagination: "Pagination",
      false: "Not Show",
      topLeft: "Top Left",
      topCenter: "Top Center",
      topRight: "Top Right",
      bottomLeft: "Bottom Left",
      bottomCenter: "Bottom Center",
      bottomRight: "Bottom Right",
      rowKey: "Row Key",
      ...sizeLocales["en-US"],
    }
  }
}

export const resourceLocales = {
  "zh-CN": {
    "Table": "表格",
  },
  'en-US': {
    "Table": "Table",
  }
}
