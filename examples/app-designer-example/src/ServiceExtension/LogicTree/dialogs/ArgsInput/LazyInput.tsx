import { Input, InputProps } from "antd"
import React, { useCallback, useEffect, useState } from "react"
import { memo } from "react"

export const LazyInput = memo((
  props: InputProps & {
    value?: string,
    onChange: (value?: string) => void,
  }
) => {
  const { value, onChange, ...other } = props;
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setInputValue(value as any);
  }, [value])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }, [])


  const handleBlur = useCallback(() => {
    onChange(inputValue)
  }, [inputValue, onChange]);

  return (
    <Input value={inputValue} onChange={handleChange} onBlur={handleBlur} {...other} />
  )
})