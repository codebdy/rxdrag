import { useNode } from "@rxdrag/react-core"
import { memo } from "react"
import styled from "styled-components"

const PlaceHolderShell = styled.tr`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex: 1;
  padding: 4px;
  opacity: 0.4;
  flex-shrink: 1;
  box-sizing: border-box;
  user-select: none;

`
const PlaceHolderInner = styled.td`
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex: 1;
  background-color: ${props=>props.theme.token?.colorBorderSecondary};
  color: ${props=>props.theme.token?.colorText};
  border: dashed 1px;
`
export const PlaceHolder = memo(() => {
  const node = useNode()
  return (
    <PlaceHolderShell >
      <PlaceHolderInner>
        {node?.title}
      </PlaceHolderInner>
    </PlaceHolderShell>
  )
})