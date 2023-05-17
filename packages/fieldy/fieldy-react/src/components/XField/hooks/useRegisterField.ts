import { useEffect, useState } from "react";
import { IField } from "@rxdrag/fieldy";
import { useFieldSchemas } from "./useFieldSchemas";
import { IFieldMeta } from "@rxdrag/schema";
import { useFieldPath, useForm } from "../../../hooks";

export function useRegisterField(fieldMeta: IFieldMeta, initialValue?: unknown) {
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
        if(fieldMeta.type === "fragment"){
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          fieldSchema.name && field.setInitialValue((initialValue as any)?.[fieldSchema.name])
        }
        if (i === fieldSchemas.length - 1) {
          field.setInitialValue(initialValue)
          //返回最后一个field，比如props.style.fontSize
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