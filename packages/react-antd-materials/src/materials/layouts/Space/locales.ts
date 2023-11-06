import { sizeLocales } from "../../locales"

export const locales = {
  "zh-CN": {
    title: "间距",
    settings: {
      align: "对齐",
      direction: "方向",
      wrap: "换行",
      ...sizeLocales["zh-CN"],
      size: "大小",
      vertical: "横",
      horizontal: "竖",
    }

  },
  'en-US': {
    title: "Space",
    settings: {
      align: "Align",
      direction: "Direction",
      wrap: "Wrap",
      ...sizeLocales["en-US"],
      size: "Size",
      vertical: "Vertical",
      horizontal: "Horizontal",
    }
  }
}


export const resourceLocales = {
  "zh-CN": {
    "Space": "间距",
  },
  'en-US': {
    "Space": "Space",
  }
}
