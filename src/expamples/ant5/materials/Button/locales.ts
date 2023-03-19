import { sizeLocales } from "../locales"

export const buttonLocales = {
  "zh-CN": {
    title: "按钮",
    description: "普通按钮",
    settings: {
      type: "类型",
      title: "标题",
      disabled: "无效",
      block: "充满",
      danger: "警醒",
      ghost: "透明",
      icon: "图标",
      shape: "形状",
      default: "默认",
      circle: "圆形",
      round: "圆角",
      ...sizeLocales["zh-CN"]
    }

  },
  'en-US': {
    title: "Button",
    settings: {
      type: "Type",
      title: "Title",
      disabled: "disabled",
      block: "Block",
      danger: "Danger",
      ghost: "Ghost",
      icon: "Icon",
      shape: "Shape",
      default: "Default",
      circle: "Circle",
      round: "Round",
      ...sizeLocales["en-US"]
    }
  }
}


export const buttonResourceLocales = {
  "zh-CN": {
    "Button": "按钮",
  },
  'en-US': {
    "Button": "Button",
  }
}
