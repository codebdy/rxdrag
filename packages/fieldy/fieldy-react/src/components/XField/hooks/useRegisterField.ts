import { useEffect, useState } from "react";
import { IField } from "@rxdrag/fieldy";
import { useFieldSchemas } from "./useFieldSchemas";
import { useFieldPath, useForm } from "../../../hooks";
import { IFieldMeta } from "@rxdrag/fieldy-schema";

export function useRegisterField(fieldMeta: IFieldMeta) {
  const [field, setField] = useState<IField>()
  const parentPath = useFieldPath() || ""
  const form = useForm()

  // 处理带点的name，比如：props.style.fontSize， 返回：props, props.style, props.style.fontSize三个Field meta
  // fragment的feid集合也同样处理
  const fieldSchemas = useFieldSchemas(fieldMeta, parentPath)

  useEffect(() => {
    if (form && fieldSchemas?.length) {
      for (let i = 0; i < fieldSchemas.length; i++) {
        const fieldSchema = fieldSchemas[i]
        const field = form.registerField(fieldSchema)
        setField(field)
      }
      return () => {
        for(const fieldSchema of fieldSchemas){
          form.unregisterField(fieldSchema.path)
        }
      }
    }
  }, [fieldMeta, fieldSchemas, form])

  return field
}