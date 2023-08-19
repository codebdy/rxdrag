import { CSSProperties, memo, useMemo } from "react"
import { Button, Space } from "antd"
import { ApartmentOutlined, AppstoreOutlined, BgColorsOutlined, EllipsisOutlined } from "@ant-design/icons"
import styled from "styled-components"
import { boxShadow, defaultHorizontalMargin, defaultVerticalMargin } from "../utils"

const Container = styled.div`
  position: fixed;
  bottom: ${defaultVerticalMargin}px;
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


export const Navbar = memo((
  props: {
    position: NavPostion
  }
) => {
  const { position } = props;

  const positionStyle: CSSProperties = useMemo(() => {
    if (position === NavPostion.TopLeft) {
      return {
        top: defaultVerticalMargin,
        left: defaultHorizontalMargin,
      }
    } else if (position === NavPostion.TopCenter) {
      return {
        top: defaultVerticalMargin,
        left: "50%",
        transform: "translateX(-50%)",
      }
    } else if (position === NavPostion.TopRight) {
      return {
        top: defaultVerticalMargin,
        right: defaultHorizontalMargin,
      }
    } else if (position === NavPostion.BottomLeft) {
      return {
        bottom: defaultVerticalMargin,
        left: defaultHorizontalMargin,
      }
    } else if (position === NavPostion.BottomCenter) {
      return {
        bottom: defaultVerticalMargin,
        left: "50%",
        transform: "translateX(-50%)",
      }
    } else if (position === NavPostion.BottomRight) {
      return {
        bottom: defaultVerticalMargin,
        right: defaultHorizontalMargin,
      }
    }

    return {}
  }, [position])

  return (
    <Container
      className="rx-nav-toolbar"
      style={positionStyle}
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