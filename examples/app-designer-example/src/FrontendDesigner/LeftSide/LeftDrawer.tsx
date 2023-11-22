import { CloseOutlined } from "@ant-design/icons"
import { ResizableColumn, floatShadow } from "@rxdrag/react-antd-shell"
import { Button } from "antd"
import { memo, useCallback, useMemo, useState } from "react"
import styled from "styled-components"

const maxWidth = 1000
const minWidth = 300

const DrawerShell = styled(ResizableColumn)`
  position: absolute;
  top: 0;
  left: calc(100% + 0px);
  height:100%;
  border-radius: 0px;
  background-color: ${props => props.theme.token?.colorBgBase};
  box-shadow: ${floatShadow};
  border: solid 1px ${props => props.theme.token?.colorBorderSecondary};
  .ant-tabs-nav{
    user-select: none;
    &::before{
      border: 0;
    }
  }
  &.closed{
    opacity: 0;
  }

`
const Title = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 16px;
  padding-right: 8px;
  border-bottom: solid 1px ${props => props.theme.token?.colorBorder};
  font-size: 14px;
`

const TitleContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`

const Content = styled.div`
  flex:1;
  padding: 8px;
  .ant-tree{
    background-color: transparent;
    min-width: 200px;
  }
  overflow: auto;
`


export const LeftDrawer = memo((
  props: {
    title?: React.ReactNode,
    open?: boolean,
    onOpenChange?: (open?: boolean) => void,
    children?: React.ReactNode,
  }
) => {
  const { title, open, onOpenChange, children } = props
  const [width, setWidth] = useState(320)
  const realWidth = useMemo(() => {
    return open ? width : 0
  }, [open, width])

  const handleClose = useCallback(() => {
    onOpenChange?.(false)
  }, [onOpenChange])


  return (
    <DrawerShell
      maxWidth={maxWidth}
      minWidth={open ? minWidth : 0}
      width={realWidth}
      onWidthChange={setWidth}
      className={!open ? "closed" : undefined}
    >
      <Title>
        <TitleContent>
          {title}
        </TitleContent>
        <Button
          size="small"
          type="text"
          icon={<CloseOutlined />}
          onClick={handleClose}
        />
      </Title>
      <Content>
        {children}
      </Content>
    </DrawerShell>
  )
})