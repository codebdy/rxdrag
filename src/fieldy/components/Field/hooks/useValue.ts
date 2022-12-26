import { useFieldState, useFieldy, useFormName } from "fieldy/hooks";
import { IFieldMeta } from "fieldy/interfaces";
import { useMemo } from "react";

export function useValue(path: string, fieldMeta: IFieldMeta) {
  const fieldy = useFieldy()
  const formName = useFormName()
  const fieldState = useFieldState(path)

  const fieldValue = useMemo(() => {
    const value = fieldy?.getFieldValue(formName || "", fieldState?.path || path)
    if (fieldMeta.type === 'fragment') {
      const fragValue: any = {}
      for (const subField of fieldMeta.fragmentFields || []) {
        if (!subField.name) {
          continue
        }
        fragValue[subField.name] = value?.[subField.name]
      }

      return fragValue
    }
    return value
  }, [fieldMeta.fragmentFields, fieldMeta.type, fieldState?.path, fieldy, formName, path])

  return fieldValue
}