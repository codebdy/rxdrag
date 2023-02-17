
import React, { forwardRef, memo } from "react";
import { Typography as AntdTypography } from "antd";

export enum TextType {
  Number = "Number",
  Date = "Date",
  Text = "Text",
}

export interface ILinkProps {
  value?: string;
}
export const Typography = memo(forwardRef<HTMLDivElement>((props: ILinkProps, ref) => {
  const { value, ...other } = props;


  return (<AntdTypography></AntdTypography>)
}))
