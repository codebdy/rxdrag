import { FieldContext, ValueSetter } from "fieldy/contexts"
import { useFieldState, useFieldy, useFormName } from "fieldy/hooks"
import { useFieldPath } from "fieldy/hooks/useFieldPath"
import { IFieldMeta } from "fieldy/interfaces"
import React, { memo, useCallback, useMemo } from "react"

export const Field = memo((props: {
  fieldMeta: IFieldMeta,
  children?: React.ReactNode
}) => {
  const { fieldMeta, children } = props
  const basePath = useFieldPath() || ""
  const fieldy = useFieldy()
  const formName = useFormName()

  const path = useMemo(() => {
    if (basePath) {
      return basePath + "." + fieldMeta.name
    } else {
      return fieldMeta.name
    }
  }, [basePath, fieldMeta.name])
  const value = useFieldState(path)?.value
  const setValue = useCallback((value?: ValueSetter<any>) => {
    if (formName) {
      fieldy?.setFieldValue(formName, path, value)
    } else {
      console.error("Can not get form name")
    }
  }, [fieldy, formName, path])

  const params = useMemo(() => {
    return {
      value,
      fieldMeta,
      path,
      setValue
    }
  }, [fieldMeta, path, setValue, value])

  return (
    <FieldContext.Provider value={params}>
      {
        children
      }
    </FieldContext.Provider>
  )
})