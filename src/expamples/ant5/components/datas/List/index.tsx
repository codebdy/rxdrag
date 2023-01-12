import React, { forwardRef, memo } from "react"
import { List as AntdList, ListProps } from "antd"

export type ListAddonProps = {
  renderItem?: React.ReactElement,
}

export const List = memo(forwardRef<HTMLDivElement>((props: ListProps<any> & ListAddonProps, ref) => {
  const { renderItem, ...other } = props
  return (
    <AntdList
      itemLayout="horizontal"
      renderItem={(item) => (
        renderItem
      )}
      {...other}
    />
  )
}))