/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, useCallback, useMemo } from "react"
import { Fold, FoldBase, FoldExtra, FoldExtraItem } from "../Fold"
import { marginTopIcon, marginRightIcon, marginLeftIcon, marginBottomIcon } from "./icons"
import { InputNumber } from "antd"

export const TetradInput = memo((props: {
  title?: string,
  title1?: string,
  title2?: string,
  title3?: string,
  title4?: string,
  icon1?: string,
  icon2?: string,
  icon3?: string,
  icon4?: string,
  value?: any,
  onChange?: (value?: any) => void,
  keys: string[]
}) => {
  const { title,
    title1,
    title2,
    title3,
    title4,
    icon1 = marginTopIcon,
    icon2 = marginRightIcon,
    icon3 = marginLeftIcon,
    icon4 = marginBottomIcon,
    value,
    onChange,
    keys
  } = props;

  const handleChange1 = useCallback((val?: string | null) => {
    onChange?.({ ...value, [keys[0]]: val || undefined })
  }, [keys, onChange, value])

  const handleChange2 = useCallback((val?: string | null) => {
    onChange?.({ ...value, [keys[1]]: val || undefined })
  }, [keys, onChange, value])

  const handleChange3 = useCallback((val?: string | null) => {
    onChange?.({ ...value, [keys[2]]: val || undefined })
  }, [keys, onChange, value])

  const handleChange4 = useCallback((val?: string | null) => {
    onChange?.({ ...value, [keys[3]]: val || undefined })
  }, [keys, onChange, value])

  const baseValue = useMemo(() => {
    if (value?.[keys[0]] === value?.[keys[1]]
      && value?.[keys[1]] === value?.[keys[2]] &&
      value?.[keys[2]] === value?.[keys[3]]) {
      return value?.[keys[0]]
    }
    return ""
  }, [keys, value])

  const handleBaseChange = useCallback((value?: string | null) => {
    const newValue = {
      [keys[0]]: value || undefined,
      [keys[1]]: value || undefined,
      [keys[2]]: value || undefined,
      [keys[3]]: value || undefined,
    }
    onChange?.(newValue)
  }, [keys, onChange])

  return (
    <Fold>
      <FoldBase title={title}>
        <BaseInput value={baseValue} onChange={handleBaseChange} />
      </FoldBase>
      <FoldExtra>
        <FoldExtraItem span={12}
          title={title1}
          icon={icon1}
        >
          <InputNumber
            value={value?.[keys[0]]}
            onChange={handleChange1}
          />
        </FoldExtraItem>
        <FoldExtraItem span={12}
          title={title2}
          icon={icon2}
        >
          <InputNumber
            value={value?.[keys[1]]}
            onChange={handleChange2}
          />
        </FoldExtraItem>
        <FoldExtraItem span={12}
          marginTop={8}
          title={title3}
          icon={icon3}
        >
          <InputNumber
            value={value?.[keys[2]]}
            onChange={handleChange3}
          />
        </FoldExtraItem>
        <FoldExtraItem span={12}
          marginTop={8}
          title={title4}
          icon={icon4}
        >
          <InputNumber
            value={value?.[keys[3]]}
            onChange={handleChange4}
          />
        </FoldExtraItem>
      </FoldExtra>
    </Fold>
  )
})

export const BaseInput = memo((props: {
  value?: string,
  onChange?: (value?: string | null) => void
}) => {
  const { value, onChange } = props;
  return (
    <InputNumber
      value={value}
      onChange={onChange}
    />
  )
})

