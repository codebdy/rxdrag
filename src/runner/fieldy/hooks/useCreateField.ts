import { useEffect, useMemo, useRef } from "react"
import { FieldType, IFieldSchema } from "../interfaces"
import { useFieldPath } from "./useFieldPath"
import { useFieldy } from "./useFieldy"
import { useFormName } from "./useFormName"

export function useCreateField(name: string, type: FieldType, value?: any) {
  const parentPath = useFieldPath() || ""
  const formName = useFormName()
  const fieldy = useFieldy()
  const fieldPath = useMemo(() => {
    return parentPath ? parentPath + "." + name : name
  }, [name, parentPath])

  const formNameRef = useRef(formName)
  formNameRef.current = formName
  const fieldPathRef = useRef(fieldPath)
  fieldPathRef.current = fieldPath
  console.log("哈哈 useCreateField", name, fieldy?.getForm(formName||""))
  const fieldMeta: IFieldSchema = useMemo(() => {
    return {
      path: fieldPath,
      type: type,
      name
    }
  }, [fieldPath, name, type])

  useEffect(() => {
    if (formName) {
      const field = fieldy?.getField(formName, fieldPath)
      if (!field) {
        fieldy?.addFields(formName, fieldMeta)
      }
      fieldy?.setFieldIntialValue(formName, fieldPath, value)
    }
  }, [fieldMeta, fieldPath, fieldy, formName, value])

  useEffect(() => {
    return () => {
      if (formNameRef.current) {
        fieldy?.removeFields(formNameRef.current, fieldPathRef.current)
      }
    }
  }, [fieldy])

  return fieldMeta
}