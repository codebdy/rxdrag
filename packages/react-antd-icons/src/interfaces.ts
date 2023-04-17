export interface IIcon {
  iconKey?: string;
  svgString?: string;
}

export const isEmpertyIcon = (icon?: IIcon) => {
  return !icon || (!icon.iconKey && !icon.svgString)
}
