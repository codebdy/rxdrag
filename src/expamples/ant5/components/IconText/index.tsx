import { forwardRef, memo } from "react"

export type IconTextProps = {

}

export const IconText = memo(forwardRef<HTMLDivElement>((props: IconTextProps, ref) => {
  return (
    <div ref={ref}>

    </div>
  )
}))