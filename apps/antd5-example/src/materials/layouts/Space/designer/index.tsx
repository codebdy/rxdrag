import { useNode, ComponentDesignerView } from "@rxdrag/react-core";
import { Space as AntdSpace } from "antd"
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