import { memo } from "react"

export const Page = memo((
  props: {
    design?: boolean
  }
) => {
  const { design } = props
  return (
    <>
    Page 内容
    </>
  )
})