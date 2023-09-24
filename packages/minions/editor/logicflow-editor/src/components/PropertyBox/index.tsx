import React, { memo, useMemo } from "react"
import styled from "styled-components"
import { useGetMaterial } from "../../hooks/useGetMaterial"
import { useSelectedNode } from "../../hooks/useSelectedNode"

const Title = styled.div`
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
          <svg viewBox="0 0 1024 1024" fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"><path d="M801.645714 170.666667l51.833905 51.590095L565.150476 511.951238l288.353524 289.670095-51.833905 51.614477-288.109714-289.450667L225.426286 853.23581 173.592381 801.621333l288.329143-289.670095L173.592381 222.256762 225.426286 170.666667l288.109714 289.426285L801.645714 170.666667z"></path></svg>
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