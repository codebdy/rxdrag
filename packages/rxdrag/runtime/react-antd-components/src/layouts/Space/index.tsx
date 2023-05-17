import { ComponentView, useComponentSchema } from "@rxdrag/react-runner";
import { Space as AntdSpace } from "antd"
import { forwardRef, memo } from "react"

export const Space = memo(forwardRef<HTMLDivElement>((
  props: { children?: React.ReactNode }, ref) => {
  const { children, ...other } = props;
  const nodeSchema = useComponentSchema()
  return (
    <AntdSpace
      {...other}
    >
      {
        nodeSchema?.children?.map(child => {
          return (<ComponentView key={child.id} node={child} />)
        })
      }
      {children}
    </AntdSpace>
  )
}))