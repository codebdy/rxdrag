import { inputBaseLocales } from "../locales"

export const dateRangePickerLocales = {
  "zh-CN": {
    title: "日期范围",
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
    title: "Date Range Picker",
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

export const dateRangePickerResourceLocales = {
  "zh-CN": {
    "DateRangePicker": "日期范围",
  },
  'en-US': {
    "DateRangePicker": "DateRangePicker",
  }
}
