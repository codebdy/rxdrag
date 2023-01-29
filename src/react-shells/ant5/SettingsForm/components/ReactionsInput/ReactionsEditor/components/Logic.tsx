import { memo, useEffect } from "react"
import { useEditEdge } from "../hooks/edit-meta/useEditEdge"
import { useAddNode } from "../hooks/edit-meta/useAddNode"
import { useMovedNode } from "../hooks/edit-meta/useMovedNode"
import { useArrowhead } from "../hooks/useArrowhead"
import { useShowCells } from "../hooks/useShowCells"
import { useTraceLining } from "../hooks/useTraceLining"
import { useSelection } from "../hooks/useSelection"
import { useRemove } from "../hooks/edit-meta/useRemove"
import { useZoom } from "../hooks/useZoom"
import { ILogicMetas } from "runner/reaction/interfaces/metas"
import { useEditorState } from "../hooks/useEditorState"

export const Logic = memo((
  props: {
    initMetas: ILogicMetas,
    onChange: (metas: ILogicMetas)=>void,
  }
) => {
  const {initMetas} = props;
  const { metas } = useEditorState()
  useShowCells()
  useTraceLining()
  useAddNode()
  useEditEdge()
  useMovedNode()
  useArrowhead()
  useSelection()
  useRemove()
  useZoom()

  useEffect(() => {
    if(metas !==initMetas){

    }
  }, [metas, initMetas])
  return null
})