
import { forwardRef, memo } from "react";
import { Typography as AntdTypography } from "antd";
import { useFormat } from "../hooks/useFormat";
import { ITypographyProps, TypographyType } from "../types";

export const Paragraph = memo(forwardRef<HTMLDivElement, ITypographyProps>((props, ref) => {
  const { value, textType = TypographyType.Text , formatMask, ...other } = props;

  const text = useFormat(value, textType, formatMask)

  return (<AntdTypography.Paragraph ref={ref} {...other}>{text}</AntdTypography.Paragraph>)
}))
