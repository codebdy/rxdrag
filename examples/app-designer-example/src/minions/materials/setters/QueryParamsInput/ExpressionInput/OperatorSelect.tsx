import { Select } from "antd"
import { memo } from "react"
import { OperatorType } from "../../../../activities/common/interfaces"
import { useTranslate } from "@rxdrag/react-locales"

export const OperatorSelect = memo((
  props: {
    value?: OperatorType,
    onChange?: (value?: OperatorType) => void,
  }) => {
  const { value, onChange } = props
  const t = useTranslate()
  return (
    <Select
      style={{ minWidth: 100 }}
      onChange={onChange}
      value={value}
      options={
        [
          { value: OperatorType.Eq, label: t(OperatorType.Eq) },
          { value: OperatorType.Ne, label: t(OperatorType.Ne) },
          { value: OperatorType.Gt, label: t(OperatorType.Gt) },
          { value: OperatorType.Lt, label: t(OperatorType.Lt) },
          { value: OperatorType.Le, label: t(OperatorType.Le) },
          { value: OperatorType.Ge, label: t(OperatorType.Ge) },
          { value: OperatorType.Like, label: t(OperatorType.Like) },
          { value: OperatorType.LikeStart, label: t(OperatorType.LikeStart) },
          { value: OperatorType.LikeEnd, label: t(OperatorType.LikeEnd) },
          { value: OperatorType.NotEmpty, label: t(OperatorType.NotEmpty) },
          { value: OperatorType.Empty, label: t(OperatorType.Empty) },
        ]}
    />
  )
})
