import React from "react"
import { forwardRef, memo, useLayoutEffect } from "react"
import { useNode } from "../hooks/useNode"
import { Callback, defaultCallback } from "./types"
import { ReactComponent } from "@rxdrag/react-shared"
import { isFn } from "@rxdrag/shared"

export function forwardRefById(WrappedComponent: ReactComponent, callback: Callback = defaultCallback): ReactComponent {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return memo(forwardRef<HTMLElement | unknown, any>((props, ref) => {
    const node = useNode()
    useLayoutEffect(() => {
      const element = node?.id ? document.getElementById(node?.id) : null
      if (isFn(ref)) {
        ref(callback(element) || null)
      }

    }, [node?.id, ref])

    return <WrappedComponent id={node?.id} {...props} />
  }))
}
