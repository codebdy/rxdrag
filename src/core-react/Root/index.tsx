import { forwardRef } from "react"
import "./style.less"

export interface RootProps {
}

export const Root = forwardRef<HTMLDivElement>((
  props: RootProps,
  ref
) => {
  return (<div ref={ref} className="rx-root-component" {...props} />)
})