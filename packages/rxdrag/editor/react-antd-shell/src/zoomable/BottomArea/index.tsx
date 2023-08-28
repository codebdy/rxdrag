import { memo } from "react"
import styled from "styled-components"
import { ResizableRow } from "../../common"
import { NavbarWidget } from "../../normal/widgets/NavbarWidget"

const BottomShell = styled(ResizableRow)`
  position: fixed;
  left:80px;
  bottom: 16px;
  width: calc(100% - 400px);
  border-radius: 8px;
  background-color: ${props => props.theme.token?.colorBgBase};
`

const ComponentNav = styled.div`
  position: absolute;
  top:-32px;
  left:0;
`

export const BottomArea = memo(() => {
  return (
    <BottomShell maxHeight={1000} minHeight={40}>
      控制器
      <ComponentNav>
      此处会显示导航
        <NavbarWidget />
      </ComponentNav>
    </BottomShell>
  )
})