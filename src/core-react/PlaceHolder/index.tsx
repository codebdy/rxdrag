import { useNode } from "core-react/hooks/useNode"
import { memo } from "react"
import { useToken } from "antd/es/theme/internal"
import styled from "styled-components"

const PlaceHolderShell = styled.div`
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
const PlaceHolderInner = styled.div`
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex: 1;
  background-color: #eee;
  border: dashed 1px;
`
export const PlaceHolder = memo(() => {
  const [, token] = useToken()
  const node = useNode()
  return (
    <PlaceHolderShell >
      <PlaceHolderInner style={{ backgroundColor: token.colorBorderSecondary, color: token.colorText }}>
        {node?.title}
      </PlaceHolderInner>
    </PlaceHolderShell>
  )
})