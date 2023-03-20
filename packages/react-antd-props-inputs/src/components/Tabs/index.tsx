import { forwardRef, memo, useMemo } from "react"
import { Tabs as AntdTabs } from 'antd';
import "./style.less"
import cls from "classnames"
import { useComponentSchema } from "@rxdrag/react-runner";
import { isArr } from "@rxdrag/shared";

export * from "./TabPanel"

export const Tabs = memo(forwardRef<HTMLDivElement>((
  props: {
    className?: string,
    children?: React.ReactNode
  },
  ref
) => {
  const { children, className, ...other } = props
  const schema = useComponentSchema()
  const items = useMemo(() => {
    if (isArr(children)) {
      return children.map(((child, index) => {
        const childSchema = schema?.children?.[index]
        const key = childSchema?.props?.title + index
        return {
          label: childSchema?.props?.title,
          key: childSchema?.props?.id || key,
          children: child,
        }
      }))
    }
  }, [children, schema?.children])
  return (
    <div ref={ref} className={cls("rx-tabs", className)} {...other}>
      <AntdTabs
        items={items}
      ></AntdTabs>
    </div>
  )
}))