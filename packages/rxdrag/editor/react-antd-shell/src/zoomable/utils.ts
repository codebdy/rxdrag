import { GlobalToken } from "antd"

export const floatShadow = (props: {
  theme: {
    mode?: "dark" | "light",
    token?: GlobalToken
  }
}) => `0 2px 5px 1px rgba(0, 0, 0, ${props.theme?.mode === "light" ? 0.05 : 0.25})`