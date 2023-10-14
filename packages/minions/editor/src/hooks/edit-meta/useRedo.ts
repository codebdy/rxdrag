import { useCallback } from "react"
import { useMetas } from "../useMetas"
import { useRedoList } from "../useRedoList"
import { useSelected } from "../useSelected"
import { useUndoList } from "../useUndoList"
import { useMarkChange } from "./useMarkChange"

export function useRedo() {
  const { undoList, setUndoList } = useUndoList()
  const { redoList, setRedoList } = useRedoList()
  const { metas, setMetas } = useMetas()
  const { selected, setSelected } = useSelected()

  const markChange = useMarkChange()
  const redo = useCallback(() => {
    const snapshot = redoList[redoList.length - 1]
    const { nodes, lines } = snapshot
    setSelected(snapshot.selected)
    setMetas({ nodes, lines })
    setUndoList([...undoList, { selected, ...metas|| { nodes: [], lines: [] } }] )
    setRedoList(redoList.slice(0, redoList.length - 1))
    markChange()
  }, [markChange, metas, redoList, selected, setMetas, setRedoList, setSelected, setUndoList, undoList])

  return redo
}