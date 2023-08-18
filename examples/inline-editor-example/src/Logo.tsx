import { memo } from "react"

export const Logo = memo(() => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        fontWeight: "bold"
      }}
    >
      <img alt="rxeditor" height={32} width={32} src="logo.png" />
    </div>
  )
})