import { FieldyEngine } from "runtime/fieldy/classes/FieldyEngine"
import { FieldyContext } from "runtime/fieldy/contexts"
import { useMemo } from "react"

export const Fieldy = (props: {
  children: React.ReactNode
}) => {
  const { children } = props
  const fieldy = useMemo(() => {
    return new FieldyEngine(false)
  }, [])

  return <FieldyContext.Provider value={fieldy}>
    {children}
  </FieldyContext.Provider>
}