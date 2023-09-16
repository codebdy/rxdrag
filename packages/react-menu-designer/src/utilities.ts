import { GlobalToken } from "antd"


export const floatShadow = (props: {
  theme: {
    mode?: "dark" | "light",
    token?: GlobalToken
  }
}) => `1px 1px 8px 4px rgba(0, 0, 0, ${props.theme?.mode === "light" ? 0.05 : 0.25})`

export const DEFAULT_MARGIN = 16
