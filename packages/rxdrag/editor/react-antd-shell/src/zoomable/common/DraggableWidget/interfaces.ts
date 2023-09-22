export interface IPosition {
  x?: number,
  y?: number,
}

export interface ISize {
  width?: number;
  heiht?: number;
}

export interface IWidgetLayout extends IPosition, ISize {
  //是否显示
  closed?: boolean;
}
