
import React, { forwardRef, memo } from "react";
import { Typography as AntdTypography } from "antd";
import { ITypographyProps } from "../types";

export enum TextType {
  Number = "Number",
  Date = "Date",
  Text = "Text",
}

export interface ITitleProps {
  level?: 1 | 2 | 3 | 4 | 5
}
export const Typography = memo(forwardRef<HTMLDivElement, ITypographyProps & ITitleProps>((props, ref) => {
  const { value, ...other } = props;

  return (<AntdTypography.Title {...other}></AntdTypography.Title>)
}))
