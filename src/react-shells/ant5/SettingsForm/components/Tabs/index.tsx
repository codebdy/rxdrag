import { forwardRef, memo, useMemo } from "react"
import { Tabs as AntdTabs } from 'antd';
import "./style.less"
import { isArr } from "core/utils/types";
import cls from "classnames"
import { useComponentSchema } from "runner/ComponentRender/hooks/useComponentSchema";

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