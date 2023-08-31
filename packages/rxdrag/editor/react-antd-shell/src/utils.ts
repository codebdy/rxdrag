import { GlobalToken } from "antd"

export const floatShadow = (props: {
  theme: {
    mode?: "dark" | "light",
    token?: GlobalToken
  }
}) => `1px 1px 8px 4px rgba(0, 0, 0, ${props.theme?.mode === "light" ? 0.05 : 0.25})`

export const floatSmallShadow = (props: {
  theme: {
    mode?: "dark" | "light",
    token?: GlobalToken
  }
}) => `2px 2px 8px 4px rgba(0, 0, 0, ${props.theme?.mode === "light" ? 0.05 : 0.25})`

export const floatBigShadow = (props: {
  theme: {
    mode?: "dark" | "light",
    token?: GlobalToken
  }
}) => `6px 6px 16px 10px rgba(0, 0, 0, ${props.theme?.mode === "light" ? 0.12 : 0.4})`