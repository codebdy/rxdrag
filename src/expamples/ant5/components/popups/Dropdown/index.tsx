import { MenuProps, Dropdown as AntdDropdown } from "antd";
import { useComponentSchema } from "core-react/ComponentRender/hooks/useComponentSchema";
import { CSSProperties, memo, useMemo } from "react"
import { IconView } from "react-shells/ant5/components/IconView";

export interface IDropdownProps {
  style?: CSSProperties,
  placement?: "bottom" | "bottomLeft" | "bottomRight" | "top" | "topLeft" | "topRight",
  trigger?: Array<"click" | "hover" | "contextMenu">,
  actionComponent?: React.ReactElement,
  menu?: React.ReactElement,
  arrow?: boolean,
}

//本控件强依赖fieldy

export const Dropdown = memo((props: IDropdownProps) => {
  const { actionComponent, menu, ...other } = props;
  const schema = useComponentSchema();

  const items: MenuProps['items'] = useMemo(() => {
    const childrenNodes = schema?.slots?.['menu']?.children || []

    return childrenNodes.map((child, index) => {
      const icon: any = child.props?.icon;
      return {
        key: index,
        icon: icon && <div style={{ paddingRight: 8 }}><IconView icon={icon} /></div>,
        label: child.props?.title,
      }
    })
  }, [schema?.slots])
  return (
    <AntdDropdown menu={{ items }} {...other}>
      {actionComponent ? actionComponent : <></>}
    </AntdDropdown>
  )
})