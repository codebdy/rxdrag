import React, { CSSProperties, memo } from "react"
import cls from "classnames"
import { NodeTag } from "./NodeTag";
import { useCurrentNode, useDocument, useDocumentViewTypeState } from "@rxdrag/react-core";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 28px;
  font-size: 13px;
  .one-node{
    user-select: none;
    cursor: pointer;
    padding-left: 7px;
    display: flex;
    align-items: center;
    .node-label{
      display: flex;
      align-items: center;
      padding-right: 7px;
    }
  }
  border-top: ${props => props.theme?.token?.colorBorder} solid 1px;
  color: ${props => props.theme?.token?.colorText};
`
//用div旋转重做该组件
export const NavbarWidget = memo((
  props: {
    className?: string,
    style?: CSSProperties,
    children?: React.ReactNode
  }
) => {
  const { className, ...other } = props;
  const currentNode = useCurrentNode()
  const doc = useDocument()
  const [viewType] = useDocumentViewTypeState(doc?.id)
  return (
    viewType === "design" ?
      <Container className={cls("rx-editor-navbar", className)} {...other}>
        {
          currentNode && <NodeTag nodeId={currentNode.id} />
        }
      </Container>
      : <></>
  )
})