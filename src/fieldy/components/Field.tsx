import { FieldContext, ValueSetter } from "fieldy/contexts"
import { useFieldPath } from "fieldy/hooks/useFieldPath"
import { IFieldMeta } from "fieldy/interfaces"
import React, { memo, useCallback, useMemo } from "react"

export const Field = memo((props: {
  fieldMeta: IFieldMeta,
  children?: React.ReactNode
}) => {
  const { fieldMeta, children } = props
  const basePath = useFieldPath() || ""

  const path = useMemo(() => {
    if (basePath) {
      return basePath + "." + fieldMeta.name
    } else {
      return fieldMeta.name
    }
  }, [basePath, fieldMeta.name])

  const setValue = useCallback((value?: ValueSetter<any>) => {

  }, [])

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