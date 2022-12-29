import { useToken } from "antd/es/theme/internal"
import { forwardRef, memo } from "react"
import "./style.less"

export const Logo = memo(forwardRef<HTMLDivElement, any>((props, ref) => {
  const [, token] = useToken();
  return (<div ref={ref} className="rx-logo" style={{ color: token.colorText, fontSize:20 }}>
    <img alt="Logo" width={40} height={40} style={{marginRight: 24,}} src="/logo.png" />
    Apper
  </div>)
}))