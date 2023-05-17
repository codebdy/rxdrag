import { MenuProps, Dropdown as AntdDropdown } from "antd";
import { CSSProperties, memo, useMemo } from "react"
import { useComponentSchema } from "@rxdrag/react-runner"
import { IconView } from "@rxdrag/react-antd-icons"

export type DropdownProps = {
  style?: CSSProperties,
  placement?: "bottom" | "bottomLeft" | "bottomRight" | "top" | "topLeft" | "topRight",
  trigger?: Array<"click" | "hover" | "contextMenu">,
  actionComponent?: React.ReactElement,
  arrow?: boolean,
  children?: React.ReactNode
}

//本控件强依赖fieldy

export const Dropdown = memo((props: DropdownProps) => {
  const { actionComponent, children, ...other } = props;
  const schema = useComponentSchema();

  const items: MenuProps['items'] = useMemo(() => {
    const childrenNodes = schema?.children || []

    return childrenNodes.map((child, index) => {
      const icon: any = child.props?.icon;
      return {
        key: index,
        icon: icon && <div style={{ paddingRight: 8 }}><IconView icon={icon} /></div>,
        label: child.props?.title,
      } as any
    })
  }, [schema])
  return (
    <AntdDropdown menu={{ items }} {...other}>
      {actionComponent ? actionComponent : <></>}
    </AntdDropdown>
  )
})