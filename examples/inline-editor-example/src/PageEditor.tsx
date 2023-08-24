import { memo } from "react"

export const PageEditor = memo((
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