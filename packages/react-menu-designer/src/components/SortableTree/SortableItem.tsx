import { memo } from "react"
import { IFlattenedItem } from "../../interfaces/flattened"
import styled from "styled-components"
import { Draggable } from "../../dnd"
import { Button } from "antd"
import { HolderOutlined } from "@ant-design/icons"
import { floatShadow } from "../../utilities"

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
`

const MouseFollowerContainer = styled(Container)`
  box-shadow: ${floatShadow};
  border-radius: 8px;
`

const Handler = styled(Button)`
  margin-right: 8px;
`

export const SortableItem = memo((
  props: {
    item: IFlattenedItem,
    index: number
  }
) => {
  const { item, index } = props
  return (
    <Draggable
      hasHandler
      draggableId={item.id}
      index={index}
      mouseFollower={
        <MouseFollowerContainer>
          <Handler
            type="text"
            icon={<HolderOutlined />}
          />
          {
            item.title
          }
          ({item.id})
        </MouseFollowerContainer>
      }
    >
      {
        (provider) => {
          return <Container ref={provider.innerRef}>
            <Handler
              ref={provider.handlerRef}
              type="text"
              icon={<HolderOutlined />}
            />
            {
              item.title
            }
            ({item.id})
          </Container>
        }
      }

    </Draggable>
  )
})