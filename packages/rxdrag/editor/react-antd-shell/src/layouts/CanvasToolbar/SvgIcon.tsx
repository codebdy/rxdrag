import { CSSProperties } from "styled-components"

export const SvgIcon = (
  props: {
    style?: CSSProperties,
    children: React.ReactNode
  }
) => {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, ...props.style }}>
      {props.children}
    </div>
  )
}