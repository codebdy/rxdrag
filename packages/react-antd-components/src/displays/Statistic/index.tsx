import { Statistic as AntdStatistic, StatisticProps } from "antd"
import { forwardRef, memo } from "react"
import { IconView } from "../IconView";
import { IIcon } from "../IconView/model";


export const Statistic = memo(forwardRef<HTMLDivElement, StatisticProps & { prefix: IIcon }>((props, ref) => {
  const { prefix, ...other } = props;
  return (
    <div ref={ref}>
      <AntdStatistic
        prefix={prefix && <IconView icon={prefix} />}
        {...other}
      />
    </div>
  )
}))