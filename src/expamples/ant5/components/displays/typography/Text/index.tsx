
import React, { forwardRef, memo } from "react";
import { Typography as AntdTypography } from "antd";
import { ITypographyProps } from "../types";

export enum TextType {
  Number = "Number",
  Date = "Date",
  Text = "Text",
}

export interface ITextProps {
  value?: string;
}
export const Text = memo(forwardRef<HTMLDivElement, ITypographyProps & ITextProps>((props, ref) => {
  const { value, ...other } = props;


  return (<AntdTypography.Text {...other}>
    {value}
  </AntdTypography.Text>)
}))
