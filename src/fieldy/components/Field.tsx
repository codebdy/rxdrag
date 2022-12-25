import { FieldContext, ValueSetter } from "fieldy/contexts"
import { useFieldState, useFieldy, useFormName } from "fieldy/hooks"
import { useFieldPath } from "fieldy/hooks/useFieldPath"
import { IFieldMeta } from "fieldy/interfaces"
import { isFunction } from "lodash"
import React, { memo, useCallback, useMemo } from "react"
import { Reaction } from "./Reaction"

export const Field = memo((props: {
  fieldMeta: IFieldMeta,
  children?: React.ReactNode
}) => {
  const { fieldMeta, children } = props
  const basePath = useFieldPath() || ""
  const fieldy = useFieldy()
  const formName = useFormName()
  const path = useMemo(() => {
    if (!fieldMeta.name) {
      return basePath
    }
    if (basePath) {
      return basePath + "." + fieldMeta.name
    } else {
      return fieldMeta.name
    }
  }, [basePath, fieldMeta.name])
  const value = useFieldState(path)?.value
  const setValue = useCallback((val?: ValueSetter<any>) => {
    let newValue = val
    if (isFunction(val)) {
      newValue = val(value)
    }
    if (formName) {
      fieldy?.setFieldValue(formName, path, newValue)
    } else {
      console.error("Can not get form name")
    }
  }, [fieldy, formName, path, value])

  const params = useMemo(() => {
    return {
      basePath,
      value,
      fieldMeta,
      path,
      setValue
    }
  }, [basePath, fieldMeta, path, setValue, value])

  return (
    <FieldContext.Provider value={params}>
      {
        fieldMeta.effects
          ? <Reaction>
            {
              children
            }
          </Reaction>
          : children
      }
    </FieldContext.Provider>
  )
})