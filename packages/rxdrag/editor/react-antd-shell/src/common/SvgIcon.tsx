import { CSSProperties } from "styled-components"

export const SvgIcon = (
  props: {
    style?: CSSProperties,
    children: React.ReactNode
  }
) => {
  return (
    <span className="anticon" style={props.style}>
      {props.children}
    </span>
  )
}