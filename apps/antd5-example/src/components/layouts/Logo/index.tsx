import { forwardRef, memo } from "react"
import "./style.less"

export const Logo = memo(forwardRef<HTMLDivElement, any>((props, ref) => {

  return (<div ref={ref} className="rx-logo" style={{ color: '#efefef', fontSize: 20, fontWeight: "bold" }}>
    <img alt="Logo" width={40} height={40} style={{ marginRight: 24 }} src="/logo.png" />
    APPER
  </div>)
}))