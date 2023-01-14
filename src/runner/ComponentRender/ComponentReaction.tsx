import React, { memo } from "react"
import { Reactions } from "runner/reaction/components/Reactions"
import { IReactionsMeta } from "runner/reaction/interfaces"

export const ComponentReaction = memo((
  props: {
    reactionsMeta?: IReactionsMeta,
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