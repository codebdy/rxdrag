import React, { CSSProperties, memo } from "react"
import cls from "classnames"
import { NodeTag } from "./NodeTag";
import styled from "styled-components";
import { useNodesOnPath } from "./useNodesOnPath";

const Container = styled.div`
  flex:1;
  display: flex;
  align-items: stretch;
  height: 28px;
  font-size: 13px;
  color: ${props => props.theme?.token?.colorText};
  padding-right: 24px;
  pointer-events: all;
`
export const FloatNodeNav = memo((
  props: {
    className?: string,
    style?: CSSProperties,
    children?: React.ReactNode
  }
) => {
  const { className, ...other } = props;
  const nodes = useNodesOnPath()

  return (
    nodes.length > 0
      ? <Container className={cls("rx-editor-navbar", className)} {...other}>
        {
          nodes.map((node, index) => {
            return <NodeTag
              key={node.id}
              node={node}
              zIndex={nodes.length - index}
              first={index === 0}
              last={nodes.length === (index + 1)}
            />
          })
        }
      </Container>
      : <div></div>
  )
})