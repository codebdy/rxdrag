import { CSSProperties, memo } from "react"
import styled from 'styled-components';
import { floatShadow, } from "../../utilities";
import { Draggable } from "../../dnd";
import { useResource } from "../../hooks/useResource";
import { DragOverlay } from "../../dnd/DragOverlay";
import classNames from "classnames";

const Item = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  padding: 0 16px;
  box-sizing: border-box;
  border-radius: 8px;
  border: solid 1px ${props => props.theme.token?.colorBorder};
  user-select: none;
  cursor: move;
  &.dragging{
    opacity: 0.8;
    background-color: ${props => props.theme.token?.colorBgContainer};
    box-shadow: ${floatShadow};
    z-index: 1;
    color:${props => props.theme.token?.colorText};
  }
`

export const ResourceItem = memo((
  props: {
    id: string,
    className?: string,
    style?: CSSProperties,
  }
) => {
  const { id, className, ...rest } = props
  const resource = useResource(id)
  return (
    <Draggable
      draggableId={id}
    >
      {
        (provider) => {
          return <>
            <Item ref={provider.innerRef} className={className} {...rest}>
              {
                resource?.title
              }
            </Item>
            <DragOverlay>
              <Item className={classNames(className, "dragging")} {...rest}>
                {
                  resource?.title
                }
              </Item>
            </DragOverlay>
          </>
        }
      }
    </Draggable>
  )
})