import { Space as AntdSpace } from "antd"
import { ComponentDesignerView } from "core-react/ComponentTreeWidget/ComponentDesignerView";
import { useNode } from "core-react/hooks/useNode";
import { forwardRef, memo } from "react"

export const SpaceDesigner = memo(forwardRef<HTMLDivElement>((
  props: { children?: React.ReactNode }, ref) => {
  const { children, ...other } = props;
  const node = useNode()
  return (
    <AntdSpace
      {...other}
    >
      {
        node?.children?.map(childId => {
          return (<ComponentDesignerView key={childId} nodeId={childId} />)
        })
      }
      {children}
    </AntdSpace>
  )
}))