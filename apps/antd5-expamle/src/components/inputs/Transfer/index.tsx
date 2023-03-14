import { forwardRef, memo } from "react"
import { Transfer as AntdTransfer, TransferProps } from "antd"

export const Transfer = memo(forwardRef<HTMLInputElement>((props: TransferProps<any>, ref) => {
  const { ...other } = props;
  return (
    <div  ref={ref}>
      <AntdTransfer {...other}/>
    </div>
  )
}))