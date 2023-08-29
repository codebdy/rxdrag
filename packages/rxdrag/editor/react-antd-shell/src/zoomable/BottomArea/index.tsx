import { memo } from "react"
import styled from "styled-components"
import { ResizableRow } from "../../common"
import { usePropertyWidthState } from "../contexts"
import { floatShadow } from "../utils"

const BottomShell = styled(ResizableRow)`
  position: fixed;
  left:16px;
  bottom: 16px;
  border-radius: 8px;
  background-color: ${props => props.theme.token?.colorBgBase};
  box-shadow: ${floatShadow};
`

const ComponentNav = styled.div`
  position: absolute;
  top:-32px;
  left:0;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`

export const BottomArea = memo(() => {
  const [propertyWidth] = usePropertyWidthState()
  return (
    <BottomShell
      maxHeight={"calc(100vh - 100px)"}
      minHeight={40}
      style={{ width: `calc(100% - ${propertyWidth + 48}px)` }}
    >
      控制器
      <ComponentNav>
        <div>导航</div>
        {/* <NavbarWidget /> */}
      </ComponentNav>
    </BottomShell>
  )
})