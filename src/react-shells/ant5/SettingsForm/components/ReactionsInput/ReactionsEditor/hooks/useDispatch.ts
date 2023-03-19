import { useEditorStore } from "./useEditorStore";

export function useDispatch() {
  const store = useEditorStore()

  return store?.dispatch
}