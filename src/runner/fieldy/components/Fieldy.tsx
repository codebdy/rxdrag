import { FieldyEngineImpl } from "runner/fieldy/classes/FieldyEngineImpl"
import { FieldyContext } from "runner/fieldy/contexts"
import { useMemo } from "react"

export const Fieldy = (props: {
  children: React.ReactNode
}) => {
  const { children } = props
  const fieldy = useMemo(() => {
    console.log("哈哈 create Fieldy")
    return new FieldyEngineImpl(false)
  }, [])

  return fieldy && <FieldyContext.Provider value={fieldy}>
    { children}
  </FieldyContext.Provider>
}