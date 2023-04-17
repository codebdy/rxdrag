import React from "react"
import { InputNumber } from "antd"
import { memo, useCallback } from "react"

export const GutterInput = memo((
  props: {
    value?: any,
    onChange?: (value?: any) => void
  }
) => {
  const { onChange, ...other } = props

  const handleChange = useCallback((value: any) => {
    onChange?.(value === null ? undefined : value)
  }, [onChange])
  return <InputNumber onChange={handleChange} {...other} />
})