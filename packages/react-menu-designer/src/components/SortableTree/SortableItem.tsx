import { memo, useCallback } from "react"
import { IFlattenedItem } from "../../interfaces/flattened"
import styled from "styled-components"
import { Draggable } from "../../dnd"
import { Badge, Button, theme } from "antd"
import { DownOutlined, HolderOutlined, RightOutlined } from "@ant-design/icons"
import { DragOverlay } from "../../dnd/DragOverlay"
import { floatShadow } from "../../utilities"
import { useToggleCollapse } from "../../hooks/useToggleCollapse"
import classNames from "classnames"
import { useResource } from "../../hooks/useResource"
import { ID } from "@rxdrag/shared"

const Container = styled.div`
  height: 48px;
  border: solid 1px ${props => props.theme.token?.colorBorder};
  //border-radius: 8px;
  margin: 0px 0;
  display: flex;
  align-items: center;
  padding: 0 8px;
  background-color: ${props => props.theme.token?.colorBgContainer};
  outline: none;
  //flex-shrink: 0;
  &.ghost{
    background-color:transparent;
    border: 0;
    height: 24px;
    padding: 0px;
    display: flex;
    box-sizing: border-box;
    border: none !important;
  }
  &.dragging{
    opacity: 0.8;
    box-shadow: ${floatShadow};
    z-index: 1;
    color:${props => props.theme.token?.colorText};
    padding-right: 16px;
  }
  &.selected{
    border: solid 1px ${props => props.theme.token?.colorPrimary};
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
  cursor: move;
`

export const SortableItem = memo((
  props: {
    item: IFlattenedItem,
    indentationWidth: number,
    tempId?: ID,
    selectedId?: ID,
    onSelect?: (id?: ID) => void,
  }
) => {
  const { item, tempId, indentationWidth, selectedId, onSelect } = props
  const isAdding = tempId === item.meta.id
  const toggleCollapse = useToggleCollapse()
  const { token } = theme.useToken()
  const resource = useResource(item.meta)

  const handleCollapse = useCallback(() => {
    toggleCollapse(item.meta.id)
  }, [item.meta.id, toggleCollapse])

  const handleClick = useCallback(() => {
    onSelect?.(item.meta.id)
  }, [item.meta.id, onSelect])

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
              className={classNames({ ghost: snapshot.isDragging || isAdding, selected: selectedId === item.meta.id })}
              onClick={handleClick}
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
                        resource?.render
                          ? resource?.render(item.meta)
                          : (item.meta.config?.title || item.meta.id)
                      }
                    </Content>
                    {
                      !!item.children?.length &&
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
            <DragOverlay style={{ display: "flex" }}>
              <Badge
                count={item.children?.length}
                style={{ color: "white", backgroundColor: token.colorPrimary }}
              >
                <Container className="dragging">
                  <Handler
                    type="text"
                    icon={<HolderOutlined />}
                  />
                  <Content>
                    {
                      resource?.render
                        ? resource?.render(item.meta)
                        : (item.meta.config?.title || item.meta.id)
                    }
                  </Content>
                </Container>
              </Badge>
            </DragOverlay>
          </>
        }
      }

    </Draggable>
  )
})