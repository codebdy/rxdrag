import { useToken } from "antd/es/theme/internal"
import { forwardRef, memo } from "react"
import { CSSProperties } from "styled-components"
import "./style.less"
import cls from "classnames"

export type PaperProps = {
  style?: CSSProperties,
  className?: string,
  children?: React.ReactNode
}

export const Paper = memo(forwardRef<HTMLDivElement, PaperProps>((
  props, ref) => {
  const { style, className, children, ...other } = props
  const [, token] = useToken()
  return (
    <div ref={ref} className={cls(className, "rx-paper")} style={{ ...style, backgroundColor: token.colorBgContainer }} {...other}>
      {children}
    </div>
  )
}))