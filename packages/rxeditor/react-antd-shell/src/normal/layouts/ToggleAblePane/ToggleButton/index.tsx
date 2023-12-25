import { LeftOutlined, RightOutlined } from "@ant-design/icons"
import cls from "classnames"
import styled from "styled-components"

const Container = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 13px;
  height: 30px;
  cursor: pointer;
  top: calc(50% - 15px);
  font-size: 10px;
  border: solid 1px;
  border-color: ${props => props?.theme?.token?.colorBorder};
  background-color: ${props => props?.theme?.token?.colorBgBase};
  color: ${props => props?.theme?.token?.colorText};
  &.left-style {
    right: -15px;
    border-radius: 0 5px 5px 0;
  }

  &.right-style {
    left: -15px;
    border-radius: 5px 0px 0px 5px;
  }
`

export enum ToggleType {
  left = "left",
  right = "right"
}

export const ToggleButton = (
  props: {
    toggleType?: ToggleType
    toggled?: boolean,
    onClick: () => void,
  }
) => {
  const { toggleType, toggled, onClick } = props
  const rightIcon = toggleType === ToggleType.left ? <RightOutlined /> : <LeftOutlined />
  const lefIcon = toggleType !== ToggleType.left ? <RightOutlined /> : <LeftOutlined />
  const typeClass = toggleType === ToggleType.left ? "left-style" : "right-style"
  return (
    <Container className={cls("toggle-button", typeClass)} onClick={onClick}>
      {
        toggled
          ? rightIcon
          : lefIcon
      }
    </Container>
  )
}