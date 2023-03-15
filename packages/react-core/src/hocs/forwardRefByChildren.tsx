import React from "react"
import { ReactComponent } from "@rxdrag/react-shared"
import { isFunction } from "lodash"
import { forwardRef, memo, useCallback } from "react"
import styled from "styled-components"
import { Callback, defaultCallback } from "./types"

const HiddenElement = styled.div`
  display: none;
`

export function forwardRefByChildren(WrappedComponent: ReactComponent, callback: Callback = defaultCallback): ReactComponent {

  return memo(forwardRef<HTMLElement>((props: any, ref) => {
    const { children, ...rest } = props
    const handleRefChange = useCallback((element: HTMLElement | null) => {
      if (isFunction(ref)) {
        ref(element?.parentElement)
      }
    }, [ref])

    return <WrappedComponent {...rest}>
      {children}
      <HiddenElement ref={handleRefChange} />
    </WrappedComponent>
  }))
}
