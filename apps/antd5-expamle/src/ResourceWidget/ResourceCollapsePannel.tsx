import { Collapse, Row } from "antd"
import { useCallback, useEffect, useState } from "react"

const key = "collapse-panel"
export const ResourceCollapsePannel = (
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


  return (
    <Collapse
      accordion
      activeKey={expanded ? key : ""}
      ghost
      //expandIconPosition="end"
      onChange={handleChange}
      {...other}
    >
      <Collapse.Panel header={<div>{title}</div>} key={key}>
        <Row gutter={0}>
          {children}
        </Row>
      </Collapse.Panel>
    </Collapse>
  )
}