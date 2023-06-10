import { memo } from "react"
import { Field } from "@rxdrag/react-fieldy"

export type LoopPanelProps = {
  value?: unknown[],
  children?: React.ReactNode,
}

export const LoopPanel = memo((props: LoopPanelProps) => {
  const { value, children } = props;
  return (
    <>
      {
        value?.map((_, index) => {
          return (
            <Field key={index} name={index.toString()}>
              {
                children
              }
            </Field>
          )
        })
      }
    </>
  )
})