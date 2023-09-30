import React, { memo, useMemo } from "react"
import styled from "styled-components"
import { useGetMaterial } from "../../hooks/useGetMaterial"
import { useSelectedNode } from "../../hooks/useSelectedNode"
import { isFunction } from "lodash"
import { useLogicFlowContext } from "../../hooks/useLogicFlowContext"

export const Title = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  border-bottom: ${props => props.theme.token?.colorBorderSecondary} solid 1px;
  padding: 0 16px;
  padding-right: 8px;
  color: ${props => props.theme.token?.colorText};
  flex-shrink: 0;
`

const Content = styled.div`
  flex:1;
  padding: 16px;
  display: flex;
  flex-flow: column;
  overflow: auto;
`

const EmptyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`

export const FlowPropertyBox = memo((props: {
  children?: React.ReactNode
}) => {
  const { children } = props;
  const logicContext = useLogicFlowContext();
  const node = useSelectedNode()
  const getMaterial = useGetMaterial()
  const material = useMemo(() => getMaterial(node?.activityName || ""), [getMaterial, node?.activityName])

  return (
    <>
      <Title>
        {isFunction(material?.icon) ? material?.icon(node?.config, logicContext) : material?.icon}
        <span style={{ marginLeft: 8 }}>
          {
            isFunction(material?.title) ? material?.title?.(node?.config, logicContext) : node?.label
          }
        </span>
      </Title>
      <Content>
        {
          node
            ? children
            : <EmptyContainer>

            </EmptyContainer>
        }
      </Content>
    </>
  )
})