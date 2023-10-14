import { Button } from "antd"
import { CSSProperties } from "react"

export const PopupButton = (
  props: {
    style?: CSSProperties,
    onClick?: () => void,
  }
) => {
  const { style, ...other } = props;
  return (
    <Button
      type="primary"
      shape="circle"
      size='small'
      style={{
        position: "absolute",
        top: "calc(50% - 8px)",
        right: -8,
        width: 16,
        minWidth: 16,
        height: 16,
        zIndex: 10,
        padding: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 18,
        ...style || {},
      }}
      icon={<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="1em" height="1em"><path d="M350.363319 367.77895l0-96.302227-224.738283 224.779215 224.738283 224.690187 0-96.316553-128.42173-128.374658L350.363319 367.77895zM542.983122 399.946548l0-128.468802-224.738283 224.779215 224.738283 224.690187 0-131.623652c160.486997 0 272.882745 51.394479 353.105777 163.696082C864.023632 592.565328 767.708102 432.024096 542.983122 399.946548" key="6735"></path></svg>}
      {...other}
    >
    </Button>
  )
}