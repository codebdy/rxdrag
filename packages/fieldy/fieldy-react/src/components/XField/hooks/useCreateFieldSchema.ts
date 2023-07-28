import { IFieldSchema } from "@rxdrag/fieldy"
import { useMemo, useRef } from "react"
import { useFieldPath } from "../../../hooks/useFieldPath"
import { FieldType } from "@rxdrag/fieldy"

export function useCreateFieldSchema(name: string, type?: FieldType) {
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
      name
    }
  }, [fieldPath, name, type])

  return fieldSchema
}