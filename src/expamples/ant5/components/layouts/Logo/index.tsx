import { memo } from "react"

export const Logo = memo(() => {
  return (<div className="rx-logo">
    <img alt="Logo" src="/logo.png" />
    Apper
  </div>)
})