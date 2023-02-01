import { Empty, Form, Input, InputNumber, Radio, Select, Slider, Switch } from "antd"
import { useToken } from "antd/es/theme/internal"
import { PreviewRoot } from "core-react/PreviewRoot"
import { memo } from "react"
import { Fieldy } from "runner/fieldy"
import styled from "styled-components"
import { methodIcon } from "../../../../../../icons/reactions"
import { useGetMaterial } from "../../hooks/useGetMaterial"
import { useSelectedNode } from "../../hooks/useSelectedNode"

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
  const node = useSelectedNode()
  const getMaterial = useGetMaterial()

  return (
    <>
      <Title style={{ borderColor: token.colorBorder }}>
        {getMaterial(node?.materialName || "")?.icon}<span style={{ marginLeft: 8 }}>{node?.label}</span>
      </Title>
      <Content>
        <PreviewRoot
          components={{
            FormItem: Form.Item,
            Input,
            Select,
            Switch,
            Radio,
            Slider,
            InputNumber,
          }}
        >
          <Fieldy>
          </Fieldy>
        </PreviewRoot>
        <EmptyContainer>
          <Empty />
        </EmptyContainer>
      </Content>
    </>
  )
})