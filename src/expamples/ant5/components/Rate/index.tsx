import { forwardRef, memo } from "react"
import { Rate as AntdRate } from "antd"

export type RateProps = {
  disabled?: boolean
}

export const Rate = memo(forwardRef<HTMLInputElement>((props: RateProps, ref) => {
  const { ...other } = props;
  return (
    <div ref={ref}>
      <AntdRate {...other} />
    </div>
  )
}))