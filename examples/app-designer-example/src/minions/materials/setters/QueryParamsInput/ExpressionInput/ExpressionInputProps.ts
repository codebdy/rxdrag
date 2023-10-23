import { IExpression } from "../../../../activities/common/interfaces"

export type ExpressionInputProps = {
  value?: IExpression,
  onChange?: (value?: IExpression) => void
}