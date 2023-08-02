import React from "react"
import { forwardRef } from "react"
import "./style.less"


export const Root = forwardRef<HTMLDivElement>((
  props: object,
  ref
) => {
  return (<div ref={ref} className="rx-root-component" {...props} />)
})