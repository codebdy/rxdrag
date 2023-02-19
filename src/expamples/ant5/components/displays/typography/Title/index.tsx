
import React, { forwardRef, memo } from "react";
import { Typography as AntdTypography } from "antd";
import { ITypographyProps, TypographyType } from "../types";
import { useFormat } from "../hooks/useFormat";

export interface ITitleProps {
  level?: 1 | 2 | 3 | 4 | 5
}
export const Title = memo(forwardRef<HTMLDivElement, ITypographyProps & ITitleProps>((props, ref) => {
  const { value, textType = TypographyType.Text , formatMask, ...other } = props;
  
  const text = useFormat(value, textType, formatMask)

  return (<AntdTypography.Title ref={ref} {...other}>{text}</AntdTypography.Title>)
}))
