import { memo } from "react"
import styled from 'styled-components';
import { floatShadow, } from "../../utilities";
import { Draggable } from "../../dnd";
import { useResource } from "../../hooks/useResource";

const Container = styled.div`
  position: relative;
  height: 48px;
  box-sizing: border-box;
  width: 100%;
  margin: 8px 0;
  &.dragging{
    opacity: 0.6;
  }
`

const MouseFollower = styled(Container)`
  opacity: 0.6;
`

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
  background-color: ${props => props.theme.token?.colorBgBase};
  &.dragging{
    opacity: 0.6;
    background-color: ${props => props.theme.token?.colorBgContainer};
    box-shadow: ${floatShadow};
    z-index: 1;
    pointer-events: none;
    color:${props => props.theme.token?.colorText};
  }
`

export const ResourceItem = memo((
  props: { name: string }
) => {
  const { name } = props
  const resource = useResource(name)
  return (
    <Draggable
      draggableId={name}
      clonable
      // mouseFollower={<MouseFollower>
      //   <Item>
      //     {
      //       resource?.title
      //     }
      //   </Item>
      // </MouseFollower>}
    >
      {
        (innerRef, snapshot) => {
          return <Container
            className={snapshot.isDragging ? "dragging" : undefined}
            ref={innerRef}
          ><Item>
              {
                resource?.title
              }
            </Item>
          </Container>
        }
      }
    </Draggable>
  )
})