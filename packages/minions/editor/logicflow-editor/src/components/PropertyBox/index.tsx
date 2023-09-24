import React, { memo, useMemo } from "react"
import styled from "styled-components"
import { useGetMaterial } from "../../hooks/useGetMaterial"
import { useSelectedNode } from "../../hooks/useSelectedNode"
import { closeIcon } from "../../icons"

export const Title = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: ${props => props.theme.token?.colorBorderSecondary} solid 1px;
  padding: 0 16px;
  padding-right: 8px;
  color: ${props => props.theme.token?.colorText};
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

export const Button = styled.div`
  padding: 6px;
  cursor: pointer;
  font-size: 16px;
`

export const PropertyBox = memo((props: {
  onClose?: () => void,
  children?: React.ReactNode
}) => {
  const { onClose, children } = props;
  const node = useSelectedNode()
  const getMaterial = useGetMaterial()
  const material = useMemo(() => getMaterial(node?.activityName || ""), [getMaterial, node?.activityName])

  return (
    <>
      <Title>
        <span>
          {material?.icon}
          <span style={{ marginLeft: 8 }}>{node?.label}</span>
        </span>
        <Button
          onClick={onClose}
        >
          {closeIcon}
        </Button>
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