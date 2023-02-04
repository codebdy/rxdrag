import { memo } from "react"
import { IControllerMeta } from "runner/reaction/interfaces/metas"

export function withController(WrappedComponent: React.FC<any> | React.ComponentClass<any>, meta?: IControllerMeta): React.FC<any> | React.ComponentClass<any> {

  if (!meta) {
    return WrappedComponent
  }

  return memo((props: any) => {

    return <WrappedComponent {...props} />
  })
}
