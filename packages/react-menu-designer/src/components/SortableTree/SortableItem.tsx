import { memo, useCallback } from "react"
import { IFlattenedItem } from "../../interfaces/flattened"
import styled from "styled-components"
import { Draggable, Identifier } from "../../dnd"
import { Button } from "antd"
import { DownOutlined, HolderOutlined, RightOutlined } from "@ant-design/icons"
import { DragOverlay } from "../../dnd/DragOverlay"
import { floatShadow } from "../../utilities"
import { useToggleCollapse } from "../../hooks/useToggleCollapse"

const Container = styled.div`
  height: 48px;
  border: solid 1px ${props => props.theme.token?.colorBorder};
  //border-radius: 8px;
  margin: 0px 0;
  display: flex;
  align-items: center;
  padding: 0 8px;
  background-color: ${props => props.theme.token?.colorBgContainer};
  //flex-shrink: 0;
  &.ghost{
    background-color:transparent;
    border: 0;
    height: 24px;
    padding: 0px;
    display: flex;
    box-sizing: border-box;
    transition: all 0.2s;
  }
  &.dragging{
    opacity: 0.8;
    box-shadow: ${floatShadow};
    z-index: 1;
    color:${props => props.theme.token?.colorText};
  }
`

const Content = styled.div`
  flex: 1;
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
    indentationWidth: number,
    tempId?: Identifier,
  }
) => {
  const { item, tempId, indentationWidth } = props
  const isAdding = tempId === item.meta.id
  const toggleCollapse = useToggleCollapse()

  const handleCollapse = useCallback(() => {
    toggleCollapse(item.meta.id)
  }, [item.meta.id, toggleCollapse])

  return (
    <Draggable
      hasHandler
      draggableId={item.meta.id}
    >
      {
        (provider, snapshot) => {
          return <>
            <Container
              ref={provider.innerRef}
              style={{ marginLeft: indentationWidth * item.depth }}
              className={snapshot.isDragging || isAdding ? "ghost" : undefined}
            >
              {
                !snapshot.isDragging && !isAdding
                  ? <>
                    <Handler
                      ref={provider.handlerRef}
                      type="text"
                      icon={<HolderOutlined />}
                    />
                    <Content>
                      {
                        item.meta.title
                      }
                      ({item.meta.id})
                    </Content>
                    {
                      item.collapsable &&
                      <Button
                        type="text"
                        size="small"
                        icon={
                          item.collapsed
                            ? <RightOutlined />
                            : <DownOutlined />
                        }
                        onClick={handleCollapse}
                      />
                    }
                  </>
                  : <GhostInner />
              }

            </Container>
            <DragOverlay>
              <Container className="dragging">
                {
                  item.meta.title
                }
              </Container>
            </DragOverlay>
          </>
        }
      }

    </Draggable>
  )
})