import { memo, useRef } from "react"
import styled from 'styled-components';
import { useMaterial } from "../../hooks/useMaterial";

const Container = styled.div`
  position: relative;
  height: 48px;
  box-sizing: border-box;
  width: 100%;
  margin: 8px 0;
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
`

const DragableItem = styled(Item)`
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  cursor: move;
  &.dragging{
    opacity: 1;
    background-color: ${props => props.theme.token?.colorBgContainer};
    z-index: 1;
    pointer-events: none;
  }
`

export const ResourceItem = memo((
  props: { name: string }
) => {
  const { name } = props
  const ref = useRef<HTMLDivElement>(null)
  const material = useMaterial(name)

  // const { attributes, listeners, isDragging, setNodeRef, transform } = useDraggable({
  //   id: name,
  //   data: {
  //     material
  //   }
  // });

  // const style = transform ? {
  //   transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  // } : undefined;

  return (
    <Container ref={ref}>
      <Item>
        {
          material?.title
        }
      </Item>
      <DragableItem
        // ref={setNodeRef}
        // className={isDragging ? "dragging" : undefined}
        // style={style}
        // {...listeners}
        // {...attributes}
      >
        {
          material?.title
        }
      </DragableItem>
    </Container>
  )
})