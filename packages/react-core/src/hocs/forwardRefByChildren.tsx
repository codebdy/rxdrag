import React from "react"
import { ReactComponent } from "@rxdrag/react-shared"
import { forwardRef, memo, useCallback } from "react"
import styled from "styled-components"
import { Callback, defaultCallback } from "./types"
import { isFn } from "@rxdrag/shared"

const HiddenElement = styled.div`
  display: none;
`

export function forwardRefByChildren(WrappedComponent: ReactComponent, callback: Callback = defaultCallback): ReactComponent {

  return memo(forwardRef<HTMLElement>((props: any, ref) => {
    const { children, ...rest } = props
    const handleRefChange = useCallback((element: HTMLElement | null) => {
      if (isFn(ref)) {
        ref(element?.parentElement||null)
      }
    }, [ref])

    return <WrappedComponent {...rest}>
      {children}
      <HiddenElement ref={handleRefChange} />
    </WrappedComponent>
  }))
}
