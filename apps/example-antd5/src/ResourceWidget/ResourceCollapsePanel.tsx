import { Collapse, CollapseProps, Row } from "antd"
import { useCallback, useEffect, useMemo, useState } from "react"

const key = "collapse-panel"
export const ResourceCollapsePanel = (
  props: {
    title: string,
    defaultExpand?: boolean,
    children?: React.ReactNode,
  }
) => {
  const { title, defaultExpand, children, ...other } = props
  const [expanded, setExpanded] = useState(defaultExpand);
  useEffect(() => {
    setExpanded(defaultExpand)
  }, [defaultExpand])
  const handleChange = useCallback((activedKey: string | string[]) => {
    setExpanded(!!activedKey)
  }, [])

  const items: CollapseProps['items'] = useMemo(() => ([{
    key,
    label: title,
    children: <Row gutter={0}>
      {children}
    </Row>
  }]), [title, children])

  return (
    <Collapse
      accordion
      defaultActiveKey={expanded ? key : ""}
      ghost
      //expandIconPosition="end"
      onChange={handleChange}
      items={items}
      {...other}
    />
  )
}