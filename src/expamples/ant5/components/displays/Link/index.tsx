
import React, { forwardRef, memo, useMemo } from "react";
import dayjs from "dayjs";
import { Typography } from "antd";

export enum TextType {
  Number = "Number",
  Date = "Date",
  Text = "Text",
}

export interface ILinkProps {
  value?: string;
}
export const Link = memo(forwardRef<HTMLDivElement>((props: ILinkProps, ref) => {
  const { value, ...other } = props;


  return (<Typography.Link></Typography.Link>)
}))
