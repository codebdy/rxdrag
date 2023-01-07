import { inputBaseLocales } from "../locales"

export const datePickerLocales = {
  "zh-CN": {
    title: "日期选择框",
    settings: {
      ...inputBaseLocales['zh-CN'],
      mode: "面板状态",
      picker: "选择器类型",
      placement: "弹出位置",
      format: "格式",
      showNow: "显示现在",
      showTime: "显示时间",
      showToday: "显示今天"
    }

  },
  'en-US': {
    title: "DatePicker",
    settings: {
      ...inputBaseLocales['en-US'],
      mode: "Mode",
      picker: "Picker",
      placement: "Placement",
      format: "Format",
      showNow: "Show Now",
      showTime: "Show Time",
      showToday: "Show Today"
    }
  }
}

export const datePickerResourceLocales = {
  "zh-CN": {
    "DatePicker": "日期选择框",
  },
  'en-US': {
    "DatePicker": "DatePicker",
  }
}
