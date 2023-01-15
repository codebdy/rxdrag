import { useField } from "runner/fieldy/hooks/useField"
import { memo, useRef } from "react"
import { IReactionsMeta } from "runner/reaction/interfaces"

export function widthController(WrappedComponent: React.FC<any> | React.ComponentClass<any>, reactionMeta?: IReactionsMeta): React.FC<any> | React.ComponentClass<any> {

  if (!Object.keys(reactionMeta?.methods||{})) {
    return WrappedComponent
  }

  return memo((props: any) => {
    const variablesRef = useRef<any>()


    return <WrappedComponent  {...props} />
  })
}
