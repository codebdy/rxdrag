export enum PatternType {
  //可编辑
  editable = 'editable',
  //禁用
  disabled = 'disabled',
  //只读
  readOnly = 'readOnly',
  //阅读模式，比如把input转成text，可以在FormItem或者Form上配置显示组件
  readPretty = 'readPretty'
}

export enum DisplayType {
  //代表字段 UI 隐藏，同时不保留字段数据
  none = "none",
  //代表字段 UI 隐藏，保留字段数据
  hidden = "hidden",
  //代表字段 UI 显示，同时恢复字段数据, 也是默认值
  visible = "visible"
}

export type DisplayProps = {
  //默认值 visible
  display?: DisplayType,
  pattern?: PatternType,

  //阅读模式阅读模式的展示组件
  prettyComponent?: string,
}