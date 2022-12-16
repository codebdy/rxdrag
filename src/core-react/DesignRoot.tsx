import { useCallback, useMemo, useState } from "react"
import { DesignComponentsContext, IComponentsParams } from "./contexts"
import { IComponents } from "./interfaces"

export const DesignRoot = (props: {
  components?: IComponents
  children: React.ReactNode
}) => {
  const { components: initalComponents, children } = props
  const [components, setComponents] = useState<IComponents>({})
  const handleRegister = useCallback((...components: IComponents[]) => {
    for (const com of components) {
      setComponents(coms => ({ ...coms, ...com }))
    }

  }, [])

  const params: IComponentsParams = useMemo(() => {
    return {
      components: { ...initalComponents, ...components },
      registerComponents: handleRegister
    }
  }, [components, handleRegister, initalComponents])

  return (
    <DesignComponentsContext.Provider value={params}>
      {
        children
      }
    </DesignComponentsContext.Provider>
  )
}