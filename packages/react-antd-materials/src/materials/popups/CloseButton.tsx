import { CloseOutlined } from "@ant-design/icons";
import { Button } from "antd"
import React, { CSSProperties } from "react"

export const CloseButton = (
  props: {
    style?: CSSProperties,
    onClick?: () => void,
  }
) => {
  const { style, ...other } = props;
  return (
    <Button
      type="primary"
      danger
      shape="circle"
      size='small'
      style={{
        position: "absolute",
        top: -12,
        right: -16,
        width: 18,
        minWidth: 16,
        height: 18,
        zIndex: 10,
        padding: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...style || {},
      }}
      icon={<CloseOutlined style={{ fontSize: 10 }} />}
      {...other}
    >
    </Button>
  )
}