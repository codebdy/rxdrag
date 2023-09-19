import { memo } from "react"
import { IFlattenedItem } from "../../interfaces/flattened"
import styled from "styled-components"
import { Draggable } from "../../dnd"
import { Button } from "antd"
import { HolderOutlined } from "@ant-design/icons"

const Container = styled.div`
  height: 48px;
  border: solid 1px ${props => props.theme.token?.colorBorder};
  //border-radius: 8px;
  margin: 0px 0;
  display: flex;
  align-items: center;
  padding: 0 8px;
  background-color: ${props => props.theme.token?.colorBgContainer};
  flex-shrink: 0;
  &.dragging{
    background-color:transparent;
    border: 0;
    height: 24px;
    padding: 0px;
    display: flex;
    box-sizing: border-box;
    transition: all 0.2s;
  }
`

const GhostInner = styled.div`
  position: relative;
  flex: 1;
  height: 8px;
  background-color: ${props => props.theme.token?.colorPrimary};
  box-sizing: border-box;
  border-radius: 4px 0 0 4px;
  &::after{
    content: "";
    position: absolute;
    left: 0px;
    top: -4px;
    height: 12px;
    width: 12px;
    border-radius: 50%;
    border: solid 2px ${props => props.theme.token?.colorPrimary};
    background-color: ${props => props.theme.token?.colorBgBase};
  }
`

const Handler = styled(Button)`
  margin-right: 8px;
`

export const SortableItem = memo((
  props: {
    item: IFlattenedItem,
    index: number,
    indentationWidth: number,
  }
) => {
  const { item, index, indentationWidth } = props
  return (
    <Draggable
      hasHandler
      draggableId={item.meta.id}
      index={index}
    >
      {
        (provider, snapshot) => {
          return <Container
            ref={provider.innerRef}
            style={{ marginLeft: indentationWidth * item.depth }}
            className={snapshot.isDragging ? "dragging" : undefined}
          >
            {
              !snapshot.isDragging
                ? <>
                  <Handler
                    ref={provider.handlerRef}
                    type="text"
                    icon={<HolderOutlined />}
                  />
                  {
                    item.meta.title
                  }
                  ({item.meta.id})
                </>
                : <GhostInner />
            }

          </Container>
        }
      }

    </Draggable>
  )
})