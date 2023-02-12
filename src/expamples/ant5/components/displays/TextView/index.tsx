
import React, { forwardRef, memo, useMemo } from "react";
import cls from 'classnames'
import dayjs from "dayjs";
import "./style.less"

export enum TextType {
  Number = "Number",
  Date = "Date",
  Text = "Text",
}

export interface ITextProps {
  value?: string;
  content?: string;
  mode?: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'p';
  style?: React.CSSProperties;
  className?: string;
  textType?: TextType;
  formatMask?: string;
}
export const TextView = memo(forwardRef<HTMLDivElement>((props: ITextProps, ref) => {
  const { value, textType = TextType.Text, formatMask, ...other } = props;

  const tagName = props.mode === 'normal' || !props.mode ? 'div' : props.mode

  const text = useMemo(() => {
    const txtValue = value === undefined ? props.content : value?.toString();
    if (textType === TextType.Date) {
      return dayjs(txtValue).format(formatMask || "YYYY-MM-DD HH:mm:ss");
    }
    return txtValue;
  }, [formatMask, props.content, textType, value])
  return React.createElement(
    tagName,
    {
      ...other,
      ref,
      className: cls(props.className, "rx-text-view"),
      value: value,
    },
    text
  )
}))
