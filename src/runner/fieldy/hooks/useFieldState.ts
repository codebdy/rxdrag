import { useFieldPath } from "./useFieldPath";
import { useFieldStateByPath } from "./useFieldStateByPath";

export function useFieldState(){
  const path = useFieldPath()
  const fieldState = useFieldStateByPath(path || "")
  return fieldState;
}