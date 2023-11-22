import { IExpression } from "../../../../activities/common/interfaces"

export type ExpressionInputProps = {
  entityId: string,
  value: IExpression,
  onChange?: (value: IExpression) => void
}