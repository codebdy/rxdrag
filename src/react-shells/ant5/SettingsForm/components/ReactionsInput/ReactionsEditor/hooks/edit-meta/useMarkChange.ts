import { useCallback } from "react";
import { ActionType } from "../../actions";
import { useEditorState } from "../useEditorState";

export function useMarkChange() {
  const { changeFlag, dispatch } = useEditorState()
  const markChange = useCallback(() => {
    dispatch({ type: ActionType.SET_CHANGE_FLAG, payload: changeFlag + 1 })
  }, [changeFlag, dispatch])

  return markChange;
}