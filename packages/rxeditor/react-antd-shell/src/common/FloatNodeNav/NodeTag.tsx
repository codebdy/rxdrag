import { ITreeNode } from "@rxdrag/core";
import { useActiveIdState, useCurrentNode, useSelect } from "@rxdrag/react-core";
import { useToken } from "antd/es/theme/internal"
import { memo, useCallback, useMemo } from "react"
import styled from "styled-components";
import { floatShadow } from "../../utils";
import classNames from "classnames";

const TagContainer = styled.div`
  position: relative;
  user-select: none;
  cursor: pointer;
  padding-left: 20px;
  display: flex;
  align-items: center;
  box-shadow: ${floatShadow};
  //border: solid 1px ${props => props.theme.token?.colorBorder};
  border-radius: 8px 0 0 8px;
  &.first{
    padding-left: 8px;
    &::after{
      border-radius: 8px 0 0 8px;
    }
    &.last{
        &::after{
        border-radius: 8px;
      }
    }
  }
  .node-label{
    display: flex;
    align-items: center;
    z-index: 1;
    padding-right: 8px;
  }
  .tag-arraw{
    position: absolute;
    width: 22px;
    height: 100%;
    //background-color: red;
    top: 0;
    right: -16px;
    overflow: hidden;
    &::before{
      position: absolute;
      content: "";
      width: 24px;
      height: 24px;
      top: -0px;
      left: -10px;
      background-color: ${props => props.theme.token?.colorBorderSecondary};
      transform: rotate(45deg);
      border: solid 1px ${props => props.theme.token?.colorBorder};
      border-radius: 3px;
    }
  }

  &::after{
    position: absolute;
    content: "";
    left: 1px;
    top: 0;
    background-color: ${props => props.theme.token?.colorBorderSecondary};
    width: 100%;
    height: 100%;
    border-right: 0;
  }

  &.last{
    .tag-arraw{
      &::before{
        background-color: ${props => props.theme.token?.colorPrimary};
        box-shadow: ${floatShadow};
      }
    }
    &::after{
      background-color: ${props => props.theme.token?.colorPrimary};
      border-radius: 0px 8px 8px 0px;
    }
  }
  &.actived{
    .tag-arraw{
      &::before{
        background-color: ${props => props.theme.token?.colorBgBase};
      }
    }
    &::after{
      background-color: ${props => props.theme.token?.colorBgBase};
    }
  }
`

export const NodeTag = memo((props: {
  node: ITreeNode,
  zIndex: number,
  first: boolean,
  last: boolean,
}) => {
  const { zIndex, node, first, last } = props;
  const [activedId, setActivedId] = useActiveIdState()

  const currentNode = useCurrentNode()
  const [, token] = useToken()
  const select = useSelect()

  const handleMouseOver = useCallback(() => {
    setActivedId(node.id)
  }, [node, setActivedId])

  const handleMouseLeave = useCallback(() => {
    setActivedId(undefined)
  }, [setActivedId])

  const selected = useMemo(() => node.id === currentNode?.id, [currentNode?.id, node.id])

  const color = useMemo(() => {
    if (selected) {
      return token.colorWhite
    }
    return token.colorText;
  }, [selected, token.colorText, token.colorWhite])

  const handleClick = useCallback(() => {
    node && select(node)
  }, [node, select])

  return (
    <TagContainer
      style={{
        color,
        zIndex
      }}
      className={classNames({ last, first, actived: activedId === node.id && node.id != currentNode?.id }, "node-tag-container")}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className="tag-arraw"></div>
      <div className="node-label">{node?.title || node?.meta.componentName}</div>
    </TagContainer>
  )
})