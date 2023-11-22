import { memo, useEffect, useMemo, useRef } from "react"
import { useEditEdge } from "../hooks/edit-meta/useEditEdge"
import { useAddNode } from "../hooks/edit-meta/useAddNode"
import { useMovedNode } from "../hooks/edit-meta/useMovedNode"
import { useArrowhead } from "../hooks/useArrowhead"
import { useShowCells } from "../hooks/useShowCells"
import { useSelection } from "../hooks/useSelection"
import { useChangeFlag } from "../hooks/useChangeFlag"
import { useMetas } from "../hooks/useMetas"
import { useSetZoom } from "../hooks/useSetZoom"
import { ILogicMetas } from "../interfaces"
import { useChildPositionChange } from "../hooks/edit-meta/useChildPositionChange"
import { useNodeEmbedded } from "../hooks/edit-meta/useNodeEmbedded"
import { useEditorStore } from "../hooks"
import { SetMetasAction, ActionType } from "../actions"

export const Logic = memo((
  props: {
    value?: ILogicMetas,
    onChange?: (metas: ILogicMetas) => void,
  }
) => {
  const { value, onChange } = props;
  const { changeFlag } = useChangeFlag()
  const { metas } = useMetas()
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
  useChildPositionChange();
  useNodeEmbedded();
  useSetZoom()
  useEffect(() => {
    if (changeFlag && metasRef.current) {
      onChangeRef.current?.(metasRef.current)
    }
  }, [changeFlag])

  const emptyMetas = useMemo(() => ({
    nodes: [],
    lines: []
  }), [])

  const store = useEditorStore()

  useEffect(() => {
    const action: SetMetasAction = { type: ActionType.SET_METAS, payload: { nodes: value?.nodes || [], lines: value?.lines || [] } }
    store?.dispatch(action)

  }, [emptyMetas, value, store])

  return null
})