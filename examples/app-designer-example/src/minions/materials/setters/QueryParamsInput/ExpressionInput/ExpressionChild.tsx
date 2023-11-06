import { memo } from "react"
import { ExpressionGroupType, ExpressionNodeType, IExpression, IExpressionGroup, IExpressionNode } from "../../../../activities/common/interfaces"
import { ExpressionInput } from "./ExpressionInput";
import { ExpressionGroup } from "./ExpressionGroup";
import { ExpressionItem } from "./ExpressionItem";

export const ExpressionChild = memo((
  props: {
    entityId: string,
    child: IExpression | IExpressionGroup,
    index: number,
    onRemove?: (id: string) => void
    onExpressionChange?: (child: IExpressionNode) => void
    onGroupChange?: (node: IExpressionNode) => void,
    onAddExpAffter?: (index: number) => void,
    onAddGroupAffter?: (index: number, groupType: ExpressionGroupType) => void
  }
) => {
  const { entityId, child, index, onRemove, onGroupChange, onExpressionChange, onAddExpAffter: onInsertExpAffter, onAddGroupAffter } = props;
  return (
    child.nodeType === ExpressionNodeType.Group ?
      <ExpressionGroup
        entityId={entityId}
        key={child.id}
        value={child as IExpressionGroup}
        onChange={onGroupChange}
        onRemove={() => onRemove?.(child.id)}
      />
      : <ExpressionItem
        key={child.id}
        onAddExpression={() => onInsertExpAffter?.(index)}
        onAddGroup={(nodType) => onAddGroupAffter?.(index, nodType)}
        onRemove={() => onRemove?.(child.id)}
      >
        <ExpressionInput entityId={entityId} value={child} onChange={(val) => val && onExpressionChange?.(val)} />
      </ExpressionItem>
  )
})