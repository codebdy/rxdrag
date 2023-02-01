import { useFieldy, useFormName } from "runner/fieldy/hooks";
import { FieldState, IFieldMeta } from "runner/fieldy/interfaces";
import { useCallback, useEffect, useState } from "react";

export function useValue(fieldPath: string, fieldMeta: IFieldMeta) {
  const [value, setValue] = useState<any>()
  const fieldy = useFieldy()
  const formName = useFormName()
  console.log("哈哈useValue",value, formName)
  useEffect(() => {
    if (formName && fieldPath) {
      console.log("哈哈useValue3",fieldPath, fieldy?.getForm(formName))
      setValue(fieldy?.getFieldValue(formName, fieldPath))
    }
  }, [fieldPath, fieldy, formName])

  const handleFieldChange = useCallback((fieldState: FieldState | undefined) => {
    const value = fieldy?.getFieldValue(formName || "", fieldState?.path || fieldPath)
    if (fieldMeta.type === 'fragment') {
      const fragValue: any = {}
      for (const subField of fieldMeta.fragmentFields || []) {
        if (!subField.name) {
          continue
        }
        fragValue[subField.name] = value?.[subField.name]
      }
      setValue(fragValue)
      return 
    }
    setValue( value)
  }, [fieldMeta.fragmentFields, fieldMeta.type, fieldPath, fieldy, formName])

  useEffect(() => {
    if (formName && fieldPath) {
      const unsub = fieldy?.subscribeToFieldChange(formName, fieldPath, handleFieldChange)
      return unsub
    }
  }, [fieldPath, fieldy, formName, handleFieldChange])

  return value
}