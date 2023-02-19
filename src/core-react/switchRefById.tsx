import { forwardRef, memo, useLayoutEffect } from "react"
import { ReactComponent } from "runner/ComponentRender/types"
import { useNode } from "./hooks/useNode"
import { isFunction } from "lodash"

type Callback = (element?: HTMLElement | null) => HTMLElement | undefined | null
const defaultCallback = (element?: HTMLElement | null) => element

export function switchRefById(WrappedComponent: ReactComponent, callback: Callback = defaultCallback): ReactComponent {

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
