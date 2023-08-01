export interface IIcon {
  iconKey?: string;
  svgString?: string;
}

export const isEmptyIcon = (icon?: IIcon) => {
  return !icon || (!icon.iconKey && !icon.svgString)
}
