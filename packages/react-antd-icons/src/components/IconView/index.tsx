import { BorderOutlined } from "@ant-design/icons";
import { CSSProperties, forwardRef } from "react";
import { getIcon } from "../../data";
import { IIcon, isEmptyIcon } from "../../interfaces";
import { SvgStringIcon } from "./SvgStringIcon";


export const EmptyIcon = (
  props: {
    style?: CSSProperties
  }
) => {
  const { style, ...other } = props;
  return <BorderOutlined style={{ ...style, color: "transparent", }} {...other} />
};


export interface IIconViewProps {
  icon?: IIcon;
  style?: CSSProperties,
  size?: number,
  color?: string,
}

export const IconView = forwardRef((props: IIconViewProps, ref) => {
  const { icon, size, color, style, ...other } = props;
  if (isEmptyIcon(icon)) {
    return <EmptyIcon {...other} />;
  }

  if (icon?.iconKey) {
    const realIcon = getIcon(icon.iconKey);
    if (realIcon?.icon) {
      return <realIcon.icon ref={ref} style={{ ...style, color:color, fontSize: size,  }} {...other} />;
    }
  }

  if (icon?.svgString) {
    return <SvgStringIcon ref={ref} icon={icon.svgString} color={color} size={size} style={style} {...other} />;
  }

  return <EmptyIcon {...other} />;
});
