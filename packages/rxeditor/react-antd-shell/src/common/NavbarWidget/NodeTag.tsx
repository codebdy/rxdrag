import { useActiveIdState, useCurrentNode, useTreeNode, useSelect } from "@rxdrag/react-core";
import { ID } from "@rxdrag/shared";
import { useToken } from "antd/es/theme/internal"
import { memo, useCallback, useMemo } from "react"

export const NodeTag = memo((props: {
  nodeId: ID,
  nextBgColor?:string,
}) => {
  const { nextBgColor, nodeId } = props;
  const [activedId, setActivedId] = useActiveIdState()

  const currentNode = useCurrentNode()
  const [, token] = useToken()
  const node = useTreeNode(nodeId)
  const select = useSelect()
  const handleMouseOver = useCallback(() => {
    setActivedId(nodeId)
  }, [nodeId, setActivedId])
  const handleMouseLeave = useCallback(() => {
    setActivedId(undefined)
  }, [setActivedId])

  const selected = useMemo(() => nodeId === currentNode?.id, [currentNode?.id, nodeId])

  const backgroundColor = useMemo(() => {
    if ((activedId === nodeId) && !selected) {
      return token.colorBgBase
    }

    if(selected){
      return token.colorPrimary
    }

    return token.colorBorderSecondary;
  }, [activedId, nodeId, selected, token.colorBgBase, token.colorBorderSecondary, token.colorPrimary])

  const color = useMemo(() => {
    if(selected){
      return token.colorWhite
    }
    return token.colorText;
  }, [selected, token.colorText, token.colorWhite])

  const handleClick = useCallback(()=>{
    node && select(node)
  }, [node, select])

  return (
    <>
      {
        node?.parentId &&
        <NodeTag nodeId={node?.parentId} nextBgColor={backgroundColor} />
      }
      <div className="one-node"
        style={{ backgroundColor: backgroundColor, color }}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        onClick = {handleClick}
      >
        <div className="node-label">{node?.title || node?.meta.componentName}</div>
        <svg aria-hidden="true" focusable="false" width="7" height="28" viewBox="0 0 7 28"><path fill={nextBgColor || token.colorBorderSecondary} d="M.5 0l6 14-6 14H7V0z"></path><path fill={token.colorBorder} d="M1 0H0l6 14-6 14h1l6-14z"></path></svg>
      </div>
    </>
  )
})