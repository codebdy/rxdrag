import { memo } from "react"
import styled from "styled-components"
import { Spring } from "../../../common"

const CanvasViewContainer = styled.div`
  position: relative;
  width: 1200px;
  .actions{
    display: none;
  }

  &:hover{
    .canvas-content{
      outline: solid 1px ${props => props.theme.token?.colorPrimary};
    }
    .actions{
      display: flex;
    }
  }
`

const CanvasToolbar = styled.div`
  display: flex;
  height: 32px;
  padding: 0px;
  color: ${props => props.theme.token?.colorText};
  //border-bottom: solid 1px ${props => props.theme.token?.colorBorder};
  //background-color: ${props => props.theme.token?.colorBorderSecondary};
  align-items: center;
`

const CanvasContent = styled.div`
  width: 1200px;
  height: 600px;
  background-color: white;
`

const CanvasTitle = styled.span`
  color:${props => props.theme.token?.colorTextSecondary};
  font-size: 13px;
`

export const CanvasView = memo((

) => {
  return (
    <CanvasViewContainer>
      <CanvasToolbar>
        <CanvasTitle>
          主场景 - <em>大屏排版布局</em>
        </CanvasTitle>
        <Spring />

      </CanvasToolbar>
      <CanvasContent className="canvas-content" />
    </CanvasViewContainer>
  )
})