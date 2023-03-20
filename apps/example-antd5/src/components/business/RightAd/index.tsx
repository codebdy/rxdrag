import { forwardRef } from "react"

export const RightAd = forwardRef<HTMLDivElement>((props, ref: any) => {
  return (<img ref={ref} width={"100%"} style={{ marginTop: 16, borderRadius: 5 }} alt="ad" src="/imgs/ad.jpg" />)
})