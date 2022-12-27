import { memo, useCallback, useMemo } from "react"
import { Fold, FoldBase, FoldExtra } from "../Fold"
import { SizeInput, SizeInputItem } from "../SizeInput"


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
    icon1,
    icon2,
    icon3,
    icon4,
    value,
    onChange,
    keys
  } = props;

  const handleChange1 = useCallback((value?: string | null) => {
    onChange?.({ [keys[0]]: value || undefined })
  }, [keys, onChange])

  const handleChange2 = useCallback((value?: string | null) => {
    onChange?.({ [keys[1]]: value || undefined })
  }, [keys, onChange])

  const handleChange4 = useCallback((value?: string | null) => {
    onChange?.({ [keys[3]]: value || undefined })
  }, [keys, onChange])

  const handleChange3 = useCallback((value?: string | null) => {
    onChange?.({ [keys[2]]: value || undefined })
  }, [keys, onChange])

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
        <SizeInputItem
          title={title1}
          icon={icon1}
          value={value?.[keys[0]]}
          onChange={handleChange1}
        />
        <SizeInputItem
          title={title2}
          icon={icon2}
          value={value?.[keys[1]]}
          onChange={handleChange2}
        />
        <SizeInputItem
          marginTop={8}
          title={title3}
          icon={icon3}
          value={value?.[keys[2]]}
          onChange={handleChange3}
        />
        <SizeInputItem
          marginTop={8}
          title={title4}
          icon={icon4}
          value={value?.[keys[3]]}
          onChange={handleChange4}
        />
      </FoldExtra>
    </Fold>
  )
})

export const BaseInput = memo((props: {
  value?: string,
  onChange?: (value?: string | null) => void
}) => {
  return (
    <SizeInput exclude={["inherit", "auto"]} {...props} />
  )
})

