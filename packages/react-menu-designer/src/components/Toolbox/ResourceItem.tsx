import { CSSProperties, memo } from "react"
import styled from 'styled-components';
import { floatShadow, } from "../../utilities";
import { Draggable } from "../../dnd";
import { useResource } from "../../hooks/useResource";
import { DragOverlay } from "../../dnd/DragOverlay";
import classNames from "classnames";
import { useTranslate } from "@rxdrag/react-locales";

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
  const t = useTranslate()
  return (
    <Draggable
      draggableId={id}
    >
      {
        (provider) => {
          return <>
            <Item ref={provider.innerRef} className={className} {...rest}>
              {
                t(resource?.title || "")
              }
            </Item>
            <DragOverlay>
              <Item className={classNames(className, "dragging")} {...rest}>
                {
                  t(resource?.title || "")
                }
              </Item>
            </DragOverlay>
          </>
        }
      }
    </Draggable>
  )
})