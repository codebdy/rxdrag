import { forwardRef, memo } from "react"
import styled from "styled-components"

const StyledItem = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 6px 0;
`


export type TreeListItemProps = {
  icon?: React.ReactNode,
  readOnly?: boolean,
}

export const TreeListItem = memo(forwardRef<HTMLDivElement, TreeListItemProps>((props, ref) => {
  return (
    <StyledItem ref={ref}>

    </StyledItem>
  )
}))