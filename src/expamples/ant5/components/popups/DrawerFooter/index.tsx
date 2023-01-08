import { useToken } from "antd/es/theme/internal";
import { CSSProperties, forwardRef, memo } from "react";
import "./style.less"

export type DrawerFooterProps = {
  style?: CSSProperties,
  className?: string,
  children?: React.ReactNode,
}

export const DrawerFooter = memo(forwardRef<HTMLDivElement>((props: DrawerFooterProps, ref) => {
  const { children, style, ...other } = props;
  const [, token] = useToken()
  return <div className="drawer-footer" ref={ref}
    style={{
      borderTop: `${token.colorBorder} solid 1px`,
      ...style
    }}
    {...other}
  >
    {children}
  </div>
}))