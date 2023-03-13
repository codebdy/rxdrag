import { forwardRef, memo, useCallback } from "react"
import { isFunction } from "lodash"
import { Callback, defaultCallback } from "./types"
import { ReactComponent } from "@rxdrag/react-shared"

export function switchRef(WrappedComponent: ReactComponent, callback: Callback = defaultCallback): ReactComponent {

  return memo(forwardRef<HTMLInputElement>((props: any, ref) => {
    const handleRefChange = useCallback((element: HTMLElement | null) => {
      if (isFunction(ref)) {
        ref(callback(element))
      }
    }, [ref])

    return <WrappedComponent ref={handleRefChange} {...props} />
  }))
}