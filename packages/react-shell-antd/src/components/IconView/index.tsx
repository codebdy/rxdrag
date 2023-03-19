import { BorderOutlined } from "@ant-design/icons";
import { CSSProperties, forwardRef } from "react";
import { IIcon } from "./model";
import { SvgStringIcon } from "./SvgStringIcon";
import { EmpertyIcon, isEmpertyIcon } from "../../SettingsForm/components";
import React from "react";
import { getIcon } from "../../shared";


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
