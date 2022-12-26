import { useFieldState, useFieldy, useFormName } from "fieldy/hooks";

export function useValue(path: string) {
  const fieldy = useFieldy()
  const formName = useFormName()
  const fieldState = useFieldState(path)

  const fieldValue = fieldy?.getFieldValue(formName || "", fieldState?.path || path)
  return fieldValue
}