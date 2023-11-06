import { PlusOutlined, DeleteOutlined } from "@ant-design/icons"
import { memo } from "react"
import styled from "styled-components"
import { Button } from "antd"
import { AddMenu } from "./AddMenu";
import classNames from "classnames";
import { ExpressionGroupType } from "../../../../activities/common/interfaces";

export const itemHeight = 48;

export const Item = styled.div`
  display: flex;
  align-items: center;
  min-height: ${itemHeight}px;
  .actions-space{
    display: none;
    &.add-open{
      display: flex;
    }
  }
  &:hover{
    .actions-space{
      display: flex;
    }    
  }
`

export const ActionSpace = styled.div`
  display: flex;
`

export const ExpressionContent = styled.div`
  flex: 1;
`

export const Actions = styled.div`
  width: 60px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`
export const AddIcon = styled(PlusOutlined)`
  font-size:12px;
`
export const RemoveIcon = styled(DeleteOutlined)`
  font-size:12px;
`
export const ExpressionItem = memo((
  props: {
    onAddExpression?: () => void,
    onAddGroup?: (nodeType: ExpressionGroupType) => void,
    onRemove?: () => void,
    children?: React.ReactNode,
  }
) => {
  const { onAddExpression, onAddGroup, onRemove, children } = props
  //const [addOpen, setAddOpen] = useState(false);

  // const handleOpenChange = useCallback((open: boolean) => {
  //   setAddOpen(open)
  // }, [])

  return (
    <Item>
      <ExpressionContent>
        {children}
      </ExpressionContent>
      <Actions className="actions">
        <ActionSpace
          className={classNames("actions-space")}
        >
          {
            onAddExpression && onAddGroup &&
            <AddMenu
              //onOpenChange={handleOpenChange}
              onAddExpression={onAddExpression}
              onAddGroup={onAddGroup}
            >
              <Button type="text" icon={<AddIcon className="add-icon" />} />
            </AddMenu>
          }

          <Button
            type="text"
            icon={<RemoveIcon className="remove-icon" />}
            onClick={onRemove}
          />
        </ActionSpace>
      </Actions>
    </Item>
  )
})