import { forwardRef, memo, useCallback } from "react"
import { ReactComponent } from "runner/ComponentRender/types"
import { isFunction } from "lodash"

type Callback = (element?: HTMLElement | null) => HTMLElement | undefined | null
const defaultCallback = (element?: HTMLElement | null) => element

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
