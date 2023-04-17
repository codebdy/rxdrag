import { useCallback } from "react"
import { useMetas } from "../useMetas"
import { useRedoList } from "../useRedoList"
import { useSelected } from "../useSelected"
import { useUndoList } from "../useUndoList"
import { useMarkChange } from "./useMarkChange"

export function useUndo() {
  const { undoList, setUndoList } = useUndoList()
  const { redoList, setRedoList } = useRedoList()
  const { metas, setMetas } = useMetas()
  const { selected, setSelected } = useSelected()

  const markeChange = useMarkChange()

  const undo = useCallback(() => {
    const snapshot = undoList[undoList.length - 1]
    const { reactions, invokes } = snapshot
    setSelected(snapshot.selected)
    setMetas({ reactions, invokes })
    setUndoList(undoList.slice(0, undoList.length - 1))
    setRedoList([...redoList, { selected, ...metas || { reactions: [], invokes: [] } }])
    markeChange()
  }, [markeChange, metas, redoList, selected, setMetas, setRedoList, setSelected, setUndoList, undoList])

  return undo
}