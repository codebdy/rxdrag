import React, { memo, useMemo } from "react"
import styled from "styled-components"
import { useGetMaterial } from "../../hooks/useGetMaterial"
import { useSelectedNode } from "../../hooks/useSelectedNode"

const Title = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  border-bottom: ${props => props.theme.token?.colorBorder} solid 1px;
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

export const PropertyBox = memo((props: {
  children?: React.ReactNode
}) => {
  const { children } = props;
  const node = useSelectedNode()
  const getMaterial = useGetMaterial()
  const material = useMemo(() => getMaterial(node?.activityName || ""), [getMaterial, node?.activityName])

  return (
    <>
      <Title>
        {material?.icon}<span style={{ marginLeft: 8 }}>{node?.label}</span>
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