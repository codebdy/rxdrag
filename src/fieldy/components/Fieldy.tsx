import { FieldyEngine } from "fieldy/classes/FieldyEngine"
import { FieldyContext } from "fieldy/contexts"
import { useMemo } from "react"

export const Fieldy = (props: {
  children: React.ReactNode
}) => {
  const { children } = props
  const fieldy = useMemo(() => {
    return new FieldyEngine()
  }, [])

  return <FieldyContext.Provider value={fieldy}>
    {children}
  </FieldyContext.Provider>
}