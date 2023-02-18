import { forwardRef, memo } from "react"

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
            <>
              {
                children
              }
            </>
          )
        })
      }
    </>
  )
}))