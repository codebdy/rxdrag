import { forwardRef, memo } from "react"
import { Field } from "runner/fieldy/components/Field";

export type LoopPanelProps = {
  value?: any[],
  children?: React.ReactNode,
}

export const LoopPanel = memo(forwardRef<HTMLDivElement, LoopPanelProps>((props, ref) => {
  const { value, children } = props;
  return (
    <>
      {
        value?.map((item, index) => {
          return (
            <Field key={index} name={index.toString()} value={item}>
              {
                children
              }
            </Field>
          )
        })
      }
    </>
  )
}))