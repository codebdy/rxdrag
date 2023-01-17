import React, { memo } from "react"
import { Reactions } from "runner/reaction/components/Reactions"
import { IControllerMeta } from "runner/reaction/metas"

export const ComponentReaction = memo((
  props: {
    reactionsMeta?: IControllerMeta,
    children?: React.ReactNode
  }
) => {
  const { reactionsMeta, children } = props

  return (
    reactionsMeta
      ? <Reactions>{children}</Reactions>
      : <>{children}</>
  )
})