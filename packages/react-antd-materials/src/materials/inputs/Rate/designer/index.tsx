import { forwardRef, memo, useCallback } from "react"
import { Rate as AntdRate } from "antd"
import { isFn } from "@rxdrag/shared"

export type RateProps = {
  disabled?: boolean
}

export const RateDesigner = memo(forwardRef<HTMLInputElement>((props: RateProps, ref) => {
  const { ...other } = props;
  const handleRefChange = useCallback((rate: any | null) => {
    if(isFn(ref) && rate){
      ref(rate.rate)
    }
  }, [ref])

  return (
    <AntdRate ref={handleRefChange} {...other} />
  )
}))