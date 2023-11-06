import { forwardRef, memo, useCallback, useRef } from "react"
import { Drawer as AntdDrawer, DrawerProps } from "antd"
import { RXID_ATTR_NAME } from "@rxdrag/core";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const DrawerDesigner = memo(forwardRef<HTMLDivElement>((props: DrawerProps & { [RXID_ATTR_NAME]?: string }, ref) => {
  const {
    title,
    children,
    footer,
    extra,
    [RXID_ATTR_NAME]: rxId,
    ...other
  } = props;

  const popupRef = useRef<HTMLDivElement | null>(null);

  const addRxdToPop = useCallback(() => {
    popupRef.current?.setAttribute(RXID_ATTR_NAME, rxId || "")
  }, [rxId])

  const handlePopRefChange = useCallback((ele: HTMLDivElement) => {
    popupRef.current = ele?.parentElement?.parentElement as HTMLDivElement
    addRxdToPop()
  }, [addRxdToPop])
  return (
    <AntdDrawer
      title={title}
      extra={extra}
      footer={footer}
      {...other}
    >
      {children}
      <div ref={handlePopRefChange}></div>
    </AntdDrawer>
  )
}))