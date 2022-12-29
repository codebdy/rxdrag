import React, { forwardRef, memo } from "react"
import { Avatar as AntdAvatar } from "antd"
import { UserOutlined } from "@ant-design/icons"
import { IconView } from "react-shells/ant5/components/IconView";
import { IIcon } from "react-shells/ant5/components/IconView/model";

export interface IAvatarProps {
  icon?: IIcon,
  value?: string,
  size?: number,
  shape?: "circle" | "square",
}

export const Avatar = memo(forwardRef<HTMLDivElement>((props: IAvatarProps, ref) => {
  const { icon, value, size, ...other } = props;
  return (
    <AntdAvatar
      ref={ref}
      {...other}
      size={size ? size : undefined}
      icon={(icon && <IconView icon={icon} />) || <UserOutlined />}
      src={value}
    >
    </AntdAvatar>
  )
}))