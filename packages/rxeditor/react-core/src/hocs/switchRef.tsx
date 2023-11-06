/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"
import { forwardRef, memo, useCallback } from "react"
import { Callback, defaultCallback } from "./types"
import { ReactComponent } from "@rxdrag/react-shared"
import { isFn } from "@rxdrag/shared"

export function switchRef(WrappedComponent: ReactComponent, callback: Callback = defaultCallback): ReactComponent {

  return memo(forwardRef<HTMLElement>((props: any, ref) => {
    const handleRefChange = useCallback((element: HTMLElement | null) => {
      if (isFn(ref)) {
        ref(callback(element) as any || null)
      } 
    }, [ref])

    return <WrappedComponent ref={handleRefChange} {...props} />
  }))
}
