import { memo } from "react"
import { Button, Space } from "antd"
import { ApartmentOutlined, AppstoreOutlined, BgColorsOutlined, EllipsisOutlined } from "@ant-design/icons"
import styled from "styled-components"
import { boxShadow, defaultHorizontalMargin, defaultVerticalMargin } from "../utils"
import { DraggableWidget } from "../DraggableWidget"

const Container = styled(DraggableWidget)`
  bottom: ${defaultVerticalMargin}px;
  right: ${defaultHorizontalMargin}px;
`
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
    <Container
      className="rx-nav-toolbar"
    >
      <Space>
        <NavButton icon={<AppstoreOutlined />} />
        <NavButton icon={<BgColorsOutlined />} />
        <NavButton icon={<ApartmentOutlined />} />
        <NavButton icon={<EllipsisOutlined />} />
      </Space>
    </Container>
  )
})