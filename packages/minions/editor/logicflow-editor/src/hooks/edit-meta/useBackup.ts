import { useCallback } from "react"
import { useDispatch } from "../useDispatch"
import { useMetas } from "../useMetas"
import { useSelected } from "../useSelected"
import { ISnapshot } from "../../interfaces"
import { ActionType } from "../../actions"

export function useBackup() {
  const dispatch = useDispatch()
  const { selected } = useSelected()
  const { metas } = useMetas()

  const backup = useCallback(() => {
    dispatch?.({ type: ActionType.BACKUP, payload: { ...metas, selected }  as ISnapshot})
  }, [dispatch, metas, selected])

  return backup
}