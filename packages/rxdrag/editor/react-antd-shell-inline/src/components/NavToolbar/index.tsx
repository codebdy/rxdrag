import { CSSProperties, memo, useMemo } from "react"
import { Button, Space } from "antd"
import { AppstoreOutlined, BgColorsOutlined } from "@ant-design/icons"
import styled from "styled-components"

const Container = styled.div`
  position: fixed;
`
const NavButton = styled(Button).attrs({ size: "large" })`
  box-shadow: 3px 4px 5px 3px rgba(0, 0, 0, 0.15);
`

export enum NavPostion {
  TopLeft = "TopLeft",
  TopCenter = "TopCenter",
  TopRight = "TopRight",
  BottomLeft = "BottomLeft",
  BottomCenter = "BottomCenter",
  BottomRight = "BottomRight",
}


export const NavToolbar = memo((
  props: {
    position: NavPostion
  }
) => {
  const { position } = props;

  const positionStyle: CSSProperties = useMemo(() => {
    if (position === NavPostion.TopLeft) {
      return {
        top: 16,
        left: 32,
      }
    } else if (position === NavPostion.TopCenter) {
      return {
        top: 16,
        left: "50%",
        transform: "translateX(-50%)",
      }
    } else if (position === NavPostion.TopRight) {
      return {
        top: 16,
        right: 32,
      }
    } else if (position === NavPostion.BottomLeft) {
      return {
        bottom: 16,
        left: 32,
      }
    } else if (position === NavPostion.BottomCenter) {
      return {
        bottom: 16,
        left: "50%",
        transform: "translateX(-50%)",
      }
    } else if (position === NavPostion.BottomRight) {
      return {
        bottom: 16,
        right: 32,
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
      </Space>
    </Container>
  )
})