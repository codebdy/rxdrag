import { memo } from "react"
import styled from "styled-components"
import { boxShadow } from "../utils"
import { CloseOutlined } from "@ant-design/icons"
import { Button } from "antd"

const Container = styled.div`
  position: fixed;
  height:calc(100vh - 120px);
  width: 200px;
  box-shadow: ${boxShadow};
  top: 50%;
  transform: translateY(-50%);
  left:8px;
  border: solid 1px ${props => props.theme?.token?.colorBorder};
  background-color: ${props => props.theme?.token?.colorBgContainer};
  border-radius: 4px;
  display: flex;
  flex-flow: column;
  color: ${props => props.theme?.token?.colorText};
`

const Title = styled.div`
  display: flex;
  padding: 8px 16px;
  padding-right: 8px;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 1px ${props => props.theme?.token?.colorBorder};
`

export const Toolbox = memo(() => {
  return (
    <Container>
      <Title>
        <span>
          工具箱
        </span>
        <Button type="text" size="small" icon={<CloseOutlined />} />
      </Title>
    </Container>
  )
})