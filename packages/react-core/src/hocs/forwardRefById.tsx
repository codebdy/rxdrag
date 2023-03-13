import { forwardRef, memo, useLayoutEffect } from "react"
import { useNode } from "../hooks/useNode"
import { isFunction } from "lodash"
import { Callback, defaultCallback } from "./types"
import { ReactComponent } from "@rxdrag/react-shared"

export function forwardRefById(WrappedComponent: ReactComponent, callback: Callback = defaultCallback): ReactComponent {

  return memo(forwardRef<HTMLInputElement>((props: any, ref) => {
    const node = useNode()
    useLayoutEffect(() => {
      const element = node?.id ? document.getElementById(node?.id) : null
      if (isFunction(ref)) {
        ref(callback(element))
      }

    }, [node?.id, ref])

    return <WrappedComponent id={node?.id} {...props} />
  }))
}
