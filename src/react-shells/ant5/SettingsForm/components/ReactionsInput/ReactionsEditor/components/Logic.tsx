import { memo, useEffect, useRef } from "react"
import { useEditEdge } from "../hooks/edit-meta/useEditEdge"
import { useAddNode } from "../hooks/edit-meta/useAddNode"
import { useMovedNode } from "../hooks/edit-meta/useMovedNode"
import { useArrowhead } from "../hooks/useArrowhead"
import { useShowCells } from "../hooks/useShowCells"
import { useSelection } from "../hooks/useSelection"
import { useRemove } from "../hooks/edit-meta/useRemove"
import { useZoom } from "../hooks/useZoom"
import { ILogicMetas } from "runner/reaction/interfaces/metas"
import { useEditorState } from "../hooks/useEditorState"

export const Logic = memo((
  props: {
    onChange: (metas: ILogicMetas) => void,
  }
) => {
  const { onChange } = props;
  const { changeFlag, metas } = useEditorState()
  const metasRef = useRef(metas)
  metasRef.current = metas;
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange

  useShowCells()
  useAddNode()
  useEditEdge()
  useMovedNode()
  useArrowhead()
  useSelection()
  useRemove()
  useZoom()
  useEffect(() => {
    if (changeFlag) {
      onChangeRef.current(metasRef.current)
    }
  }, [changeFlag])

  return null
})