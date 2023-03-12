import { useEffect, useState } from "react";
import { useFieldPath, useForm } from "runner/fieldy/hooks";
import { IField, IFieldMeta } from "runner/fieldy/interfaces";
import { useFieldSchemas } from "./useFieldSchemas";

export function useRegisterField(fieldMeta: IFieldMeta, initialValue?: any) {
  const [field, setField] = useState<IField>()
  const parentPath = useFieldPath() || ""

  const form = useForm()

  // 处理带点的name，比如：props.style.fontSize
  const fieldSchemas = useFieldSchemas(fieldMeta, parentPath)

  useEffect(() => {
    if (form && fieldSchemas?.length) {
      for (let i = 0; i < fieldSchemas.length; i++) {
        const fieldSchema = fieldSchemas[i]
        const field = form.registerField(fieldSchema)
        if (i === fieldSchemas.length - 1) {
          field.setInitialValue(initialValue)
          setField(field)
        }
      }
      return () => {
        for(const fieldSchema of fieldSchemas){
          form.unregisterField(fieldSchema.path)
        }
      }
    }
  }, [fieldMeta, fieldSchemas, form, initialValue])

  return field
}