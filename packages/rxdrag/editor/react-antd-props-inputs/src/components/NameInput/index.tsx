import { Input, InputProps } from "antd"
import { memo, useCallback } from "react"

export const NameInput = memo((props: InputProps & {
  onChange?: (value?: string) => void
}) => {
  const { onChange, ...rest } = props

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value?.trim())
  }, [onChange])

  return (
    <Input {...rest} onChange={handleChange} />
  )
})