import { memo } from "react"

export const DefaultPretty = memo((
  props: {
    value?: unknown,
  }
) => {
  const { value } = props
  return (
      (value as any)?.toString() || "N/A"
  )
})