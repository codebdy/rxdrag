import { useCallback, useMemo, useState } from "react"
import { IComponentsParams, PreviewComponentsContext } from "./contexts"
import { IComponents } from "./interfaces"

export const PreviewRoot = (props: {
  components?: IComponents,
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
    <PreviewComponentsContext.Provider value={params}>
      {
        children
      }
    </PreviewComponentsContext.Provider>
  )
}