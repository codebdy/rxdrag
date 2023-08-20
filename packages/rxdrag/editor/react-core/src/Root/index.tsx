import React from "react"
import { forwardRef } from "react"
import styled from "styled-components"

const RootComponent = styled.div`
  min-height: 100%;
  min-width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-flow: column;
`

export const Root = forwardRef<HTMLDivElement>((
  props: object,
  ref
) => {
  return (<RootComponent ref={ref} className="rx-root-component" {...props} />)
})