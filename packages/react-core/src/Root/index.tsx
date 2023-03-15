import React from "react"
import { forwardRef } from "react"
import "./style.css"

export interface RootProps {
}

export const Root = forwardRef<HTMLDivElement>((
  props: RootProps,
  ref
) => {
  return (<div ref={ref} className="rx-root-component" {...props} />)
})