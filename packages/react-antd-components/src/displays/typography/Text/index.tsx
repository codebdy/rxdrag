
import React, { forwardRef, memo } from "react";
import { Typography as AntdTypography } from "antd";
import { ITypographyProps, TypographyType } from "../types";
import { useFormat } from "../hooks/useFormat";

export interface ITextProps {
  value?: string;
}
export const Text = memo(forwardRef<HTMLDivElement, ITypographyProps & ITextProps>((props, ref) => {
  const { value, textType = TypographyType.Text, formatMask, ...other } = props;
  const text = useFormat(value, textType, formatMask)

  return (<AntdTypography.Text ref={ref} {...other}>
    {text}
  </AntdTypography.Text>)
}))
