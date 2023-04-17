import { forwardRef, memo } from "react"
import { Slider as AntdSlider } from "antd"

export type RateProps = {
  disabled?: boolean
}

export const Slider = memo(forwardRef<HTMLInputElement>((props: RateProps, ref) => {
  const { ...other } = props;
  return (
    <div ref={ref}>
      <AntdSlider {...other} />
    </div>
  )
}))