import { useField } from "runner/fieldy/hooks/useField"
import { memo, useRef } from "react"
import { IControllerMeta } from "runner/reaction/metas"

export function widthController(WrappedComponent: React.FC<any> | React.ComponentClass<any>, reactionMeta?: IControllerMeta): React.FC<any> | React.ComponentClass<any> {

  if (!Object.keys(reactionMeta?.reactions||{})) {
    return WrappedComponent
  }

  return memo((props: any) => {
    const variablesRef = useRef<any>()


    return <WrappedComponent  {...props} />
  })
}
