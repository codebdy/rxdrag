import { memo } from "react"
import { Button, Space } from "antd"
import { ApartmentOutlined, AppstoreOutlined, BgColorsOutlined, EllipsisOutlined } from "@ant-design/icons"
import styled from "styled-components"
import { boxShadow } from "../utils"
import { DraggableWidget } from "../DraggableWidget"

const NavButton = styled(Button).attrs({ size: "large" })`
  box-shadow: ${boxShadow};
`

export enum NavPostion {
  TopLeft = "TopLeft",
  TopCenter = "TopCenter",
  TopRight = "TopRight",
  BottomLeft = "BottomLeft",
  BottomCenter = "BottomCenter",
  BottomRight = "BottomRight",
}


export const Navbar = memo(() => {

  return (
    <DraggableWidget
      className="rx-nav-toolbar" defaultPosition={
        {
          x: 100,
          y: 100,
        }
      }
    >
      <Space>
        <NavButton icon={<AppstoreOutlined />} />
        <NavButton icon={<BgColorsOutlined />} />
        <NavButton icon={<ApartmentOutlined />} />
        <NavButton icon={<EllipsisOutlined />} />
      </Space>
    </DraggableWidget>
  )
})