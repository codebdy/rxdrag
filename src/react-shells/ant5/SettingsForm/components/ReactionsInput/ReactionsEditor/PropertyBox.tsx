import { Empty } from "antd"
import { useToken } from "antd/es/theme/internal"
import { memo } from "react"
import styled from "styled-components"

const Title = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  border-bottom: solid 1px;
  padding: 0 16px;
`

const Content = styled.div`
  flex:1;
  padding: 16px;
  display: flex;
  flex-flow: column;
`

const EmptyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`

export const PropertyBox = memo(() => {
  const [, token] = useToken()

  return (
    <>
      <Title style={{ borderColor: token.colorBorder }}>
        打开
      </Title>
      <Content>
        <EmptyContainer>
          <Empty />
        </EmptyContainer>
      </Content>
    </>
  )
})