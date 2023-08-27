import { memo } from "react"
import { Button, Space } from "antd"
import { ApartmentOutlined, AppstoreOutlined, BgColorsOutlined } from "@ant-design/icons"
import styled from "styled-components"
import { boxShadow, defaultHorizontalMargin, defaultVerticalMargin } from "../utils"
import { DraggableWidget } from "../DraggableWidget"
import { WidgetNames } from "../../interfaces"
import { useToggleDisplay } from "../../hooks/useToggleDisplay"

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
  const toggle = useToggleDisplay()

  return (
    <Container
      className="rx-nav-toolbar"
      name={WidgetNames.navbar}
    >
      <Space>
        <NavButton
          icon={<AppstoreOutlined />}
          onClick={() => toggle(WidgetNames.toolbox)}
        />
        <NavButton
          icon={<BgColorsOutlined />}
          onClick={() => toggle(WidgetNames.property)}
        />
        <NavButton
          icon={<ApartmentOutlined />}
          onClick={() => toggle(WidgetNames.outline)}
        />
        {/* <NavButton icon={<EllipsisOutlined />} /> */}
      </Space>
    </Container>
  )
})