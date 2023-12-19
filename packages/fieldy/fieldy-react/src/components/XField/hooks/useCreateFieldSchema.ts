import { IFieldSchema } from "@rxdrag/fieldy"
import { useMemo, useRef } from "react"
import { useFieldPath } from "../../../hooks/useFieldPath"
import { FieldType } from "@rxdrag/fieldy"
import { IYupValidateSchema } from "@rxdrag/fieldy-yup-validation"

export function useCreateFieldSchema(name: string | number, type?: FieldType, rules?: IYupValidateSchema) {
  const parentPath = useFieldPath() || ""
  const fieldPath = useMemo(() => {
    return parentPath ? parentPath + "." + name : name.toString()
  }, [name, parentPath])

  const fieldPathRef = useRef(fieldPath)
  fieldPathRef.current = fieldPath
  const fieldSchema: IFieldSchema = useMemo(() => {
    return {
      path: fieldPath,
      type: type,
      name,
      validateRules: rules,
    }
  }, [fieldPath, name, rules, type])

  return fieldSchema
}