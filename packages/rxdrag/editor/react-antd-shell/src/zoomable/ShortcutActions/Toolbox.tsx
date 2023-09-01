import { useSettersTranslate } from "@rxdrag/react-core"
import { memo, useCallback, useEffect, useState } from "react"
import styled from "styled-components"
import { floatBigShadow } from "../../utils"
import { WidgetTitle } from "../common/WidgetTitle"
import { DraggableWidget } from "../common/DraggableWidget"

const Container = styled(DraggableWidget)`
  display: flex;
  right: 364px;
  top: 56px;
  flex: 1;
  box-shadow: ${floatBigShadow};
  background-color: ${props => props.theme.token?.colorBgBase};
  width: 280px;
  height: calc(100% - 80px);
  flex-flow: column;
  z-index: 10;
  border-radius: 8px;
  padding-bottom: 16px;
`
const PannelContent = styled.div`
  flex:1;
  display: flex;
  height: 0;
  overflow: auto;
`

const Title = styled(WidgetTitle)`
  cursor: move;
`

export const Toolbox = memo((
  props: {
    children?: React.ReactNode,
    open?: boolean,
    onOpenChange?: (open?: boolean) => void,
  }
) => {
  const { children, open, onOpenChange } = props;
  const [closed, setClosed] = useState(!open)

  useEffect(() => {
    setClosed(!open)
  }, [open])

  const t = useSettersTranslate()
  const handleCollapse = useCallback(() => {
    setClosed(true)
    onOpenChange?.(false)
  }, [onOpenChange])

  return (
    <Container className="rx-widget-toolbox" closed={closed}>
      <Title
        className="toolbox-title"
        title={t("components")}
        onClose={handleCollapse}
      />
      <PannelContent className="toolbox-content">
        {
          children
        }
      </PannelContent>
    </Container>
  )
})