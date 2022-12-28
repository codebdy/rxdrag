import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons"
import React from "react"
import { memo } from "react"
import { useLayoutParams } from "../context"
import "./style.less"

export const Trigger = memo(() => {
  const { collapsed, setCollapsed } = useLayoutParams() || {}
  return (
    React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
      className: 'trigger',
      onClick: () => setCollapsed?.(!collapsed),
    })
  )
})