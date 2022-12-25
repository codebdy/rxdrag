import { useFieldy, useFormName } from "fieldy/hooks"
import { useField } from "fieldy/hooks/useField"
import { memo, useCallback, useEffect } from "react"

const PREFIX_SIBLINGS = "$siblings"
//const PREFIX_SELF = "$self"

export const Reaction = memo((
  props: {
    children?: React.ReactNode
  }
) => {
  const fieldy = useFieldy()
  const { fieldMeta, basePath } = useField()
  const formName = useFormName()
  const getFieldPaths = useCallback((fields: string[]) => {
    return fields.map(field => field.replace(PREFIX_SIBLINGS + ".", basePath ? (basePath + ".") : ""))
  }, [basePath])

  const handleFieldsValueChange = useCallback((newValues: any[], prevousValues: any[]) => {

  }, [])

  useEffect(() => {
    const fieldValueChange = fieldMeta?.effects?.onFieldsValueChange
    if (fieldValueChange?.fields && formName) {
      const unsub = fieldy?.subscribeToFieldsValueChange(formName, getFieldPaths(fieldValueChange.fields), handleFieldsValueChange)
      return unsub
    }

  }, [fieldMeta?.effects?.onFieldsValueChange, fieldy, formName, getFieldPaths, handleFieldsValueChange])

  return (
    <>
      {props.children}
    </>
  )
})