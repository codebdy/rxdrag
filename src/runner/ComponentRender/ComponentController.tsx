import React, { memo } from "react"
import { Reactions } from "runner/reaction/components/Reactions"
import { IControllerMeta } from "runner/reaction/metas"

export const ComponentController = memo((
  props: {
    meta?: IControllerMeta,
    children?: React.ReactNode
  }
) => {
  const { meta, children } = props

  return (
    meta
      ? <Reactions>{children}</Reactions>
      : <>{children}</>
  )
})