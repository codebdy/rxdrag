import { memo } from "react"
import { useRedo, useRedoList, useUndo, useUndoList } from "@rxdrag/minions-logicflow-editor"
import { Button } from "antd"
import styled from "styled-components"
import { redoIcon, undoIcon } from "./icons"


export const ToolbarButton = styled((props) => <Button type="text" size="small" {...props} />)`
`
export const FlowUdredoButtons = memo(() => {
  const { redoList } = useRedoList()
  const { undoList } = useUndoList()
  const undo = useUndo()
  const redo = useRedo()
  return (
    <>
      <ToolbarButton
        disabled={!undoList.length}
        icon={<span role="img" className="anticon">{undoIcon}</span>}
        onClick={undo}
      ></ToolbarButton>
      <ToolbarButton
        disabled={!redoList.length}
        icon={<span role="img" className="anticon">{redoIcon}</span>}
        onClick={redo}
      ></ToolbarButton>
    </>
  )
})