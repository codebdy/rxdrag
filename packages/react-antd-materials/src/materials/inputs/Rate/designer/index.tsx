import { forwardRef, memo, useCallback } from "react"
import { Rate as AntdRate } from "antd"
import { isFunction } from "lodash"

export type RateProps = {
  disabled?: boolean
}

export const RateDesigner = memo(forwardRef<HTMLInputElement>((props: RateProps, ref) => {
  const { ...other } = props;
  const handleRefChange = useCallback((rate: any | null) => {
    if(isFunction(ref) && rate){
      ref(rate.rate)
    }
  }, [ref])

  return (
    <AntdRate ref={handleRefChange} {...other} />
  )
}))