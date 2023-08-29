import { GlobalToken } from "antd"

export const floatShadow = (props: {
  theme: {
    mode?: "dark" | "light",
    token?: GlobalToken
  }
}) => `0px 0px 8px 4px rgba(0, 0, 0, ${props.theme?.mode === "light" ? 0.1 : 0.25})`