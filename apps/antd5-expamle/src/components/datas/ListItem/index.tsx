import List, { ListItemProps } from "antd/es/list"
import React, { forwardRef, memo } from "react"

export const ListItem = memo(forwardRef<HTMLDivElement, ListItemProps & { actions: React.ReactNode }>((props, ref) => {
  const { actions, ...other } = props
  return (<List.Item actions={actions ? [actions] : actions} {...other} />)
}))