import React, { CSSProperties, memo } from "react"
import { useStyles } from "../../hooks/useStyles";
import cls from "classnames"
import "./style.less"
import { NodeTag } from "./NodeTag";
import { useCurrentNode, useDocument, useDocumentViewTypeState } from "@rxdrag/react-core";

export const NavbarWidget = memo((
  props: {
    className?: string,
    style?: CSSProperties,
    children?: React.ReactNode
  }
) => {
  const { className, style, children, ...other } = props;
  const currentNode = useCurrentNode()
  const styles = useStyles((token) => ({
    borderTop: `${token.colorBorder} solid 1px`,
    color: token.colorText,
  }))
  const doc = useDocument()
  const [viewType] = useDocumentViewTypeState(doc?.id)
  return (
    viewType === "design" ?
      <div className={cls("rx-editor-navbar", className)} style={{ ...styles, ...style }} {...other}>
        {
          currentNode && <NodeTag nodeId={currentNode.id} />
        }
      </div>
      : <></>
  )
})