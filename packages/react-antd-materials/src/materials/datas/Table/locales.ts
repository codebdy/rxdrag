import { eventsLocales, sizeLocales } from "../../locales"

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
      paginationChange: "分页",
      ...sizeLocales["zh-CN"],
      ...eventsLocales["zh-CN"],
      dataSource: "数据源",
      onPageChange: "分页变化",
      setDataSource: "设置数据源",
      setPagination: "分页配置",
      setFilters: "过滤配置",
      setSorter: "排序配置",
      loading: "加载中",
      paginationConfig: "分页配置",
      filtersConfig: "过滤配置",
      sorterConfig: "排序配置",
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
      paginationChange: "Pagination Change",
      ...sizeLocales["en-US"],
      ...eventsLocales["en-US"],
      dataSource: "Dtata source",
      onPageChange: "onPageChange",
      setDataSource: "setDataSource",
      setPagination: "setPagination",
      setFilters: "setFilters",
      setSorter: "setSorter",
      loading: "Loading",
      paginationConfig: "paginationConfig",
      filtersConfig: "filtersConfig",
      sorterConfig: "sorterConfig",
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
