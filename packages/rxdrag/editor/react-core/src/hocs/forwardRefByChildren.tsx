import React from "react"
import { ReactComponent } from "@rxdrag/react-shared"
import { forwardRef, memo, useCallback } from "react"
import styled from "styled-components"
import { isFn } from "@rxdrag/shared"

const HiddenElement = styled.div`
  display: none;
`

export function forwardRefByChildren(WrappedComponent: ReactComponent): ReactComponent {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
