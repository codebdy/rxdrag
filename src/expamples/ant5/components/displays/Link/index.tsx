
import { forwardRef, memo } from "react";
import { Typography } from "antd";

export interface ILinkProps {
  value?: string;
  href?: string;
  target?: string;
}
export const Link = memo(forwardRef<HTMLDivElement>((props: ILinkProps, ref) => {
  const { value, ...other } = props;

  return (<Typography.Link ref={ref} {...other}>{value || "no data"}</Typography.Link>)
}))
