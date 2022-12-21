import { FieldContext, ValueSetter } from "fieldy/contexts"
import { useFieldy, useFormName } from "fieldy/hooks"
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

  const setValue = useCallback((value?: ValueSetter<any>) => {
    if (formName) {
      fieldy?.setFieldValue(formName, path, value)
    } else {
      console.error("Can not get form name")
    }
  }, [fieldy, formName, path])

  const params = useMemo(() => {
    return {
      path,
      setValue
    }
  }, [path, setValue])

  return (
    <FieldContext.Provider value={params}>
      {
        children
      }
    </FieldContext.Provider>
  )
})