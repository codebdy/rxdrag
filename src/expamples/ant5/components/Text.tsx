import { forwardRef, memo } from "react";

export const Text = memo(forwardRef<HTMLDivElement>((
  props: {
    text?: string
  },
  ref
) => {
  return (
    <span ref={ref}>
      {
        props.text
      }
    </span>
  )
}))