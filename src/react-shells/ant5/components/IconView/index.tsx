import { BorderOutlined } from "@ant-design/icons";
import { CSSProperties, forwardRef } from "react";
import { getIcon } from "react-shells/ant5/shared/icons/data";

import { IIcon } from "./model";
import { SvgStringIcon } from "./SvgStringIcon";

export const isEmpertyIcon = (icon?: IIcon) => {
  return !icon || (!icon.iconKey && !icon.svgString)
}

export const EmpertyIcon = (
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
  if (isEmpertyIcon(icon)) {
    return <EmpertyIcon {...other} />;
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

  return <EmpertyIcon {...other} />;
});
