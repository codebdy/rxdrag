import { memo } from "react";
import { ExpressionGroup } from "./ExpressionGroup";
import { IExpressionGroup } from "../../../../activities/common/interfaces";

export const ExpressionTreeInput = memo((
  props: {
    value: IExpressionGroup,
    onChange?: (value: IExpressionGroup) => void
  }
) => {
  const { value, onChange } = props

  return (
    <ExpressionGroup
      value={value}
      onChange={onChange}
    />
  )
})