import { useCallback, useMemo, useState } from "react"
import { DesignComponentsContext, IDesignerComponentsParams } from "./contexts"
import { IComponents } from "./interfaces"

export const DesignRoot = (props: {
  components?: IComponents,
  tools?: IComponents,
  children: React.ReactNode,
}) => {
  const { components: initialComponents, tools: initialTools, children } = props
  const [components, setComponents] = useState<IComponents>({})
  const [tools, setTools] = useState<IComponents>({})
  const handleRegister = useCallback((...components: IComponents[]) => {
    for (const com of components) {
      setComponents(coms => ({ ...coms, ...com }))
    }
  }, [])

  const handleRegisterTools = useCallback((...components: IComponents[]) => {
    for (const com of components) {
      setTools(coms => ({ ...coms, ...com }))
    }
  }, [])
  const params: IDesignerComponentsParams = useMemo(() => {
    return {
      components: { ...initialComponents, ...components },
      tools: { ...initialTools, ...tools },
      registerComponents: handleRegister,
      registerTools: handleRegisterTools,
    }
  }, [components, handleRegister, handleRegisterTools, initialComponents, initialTools, tools])

  return (
    <DesignComponentsContext.Provider value={params}>
      {
        children
      }
    </DesignComponentsContext.Provider>
  )
}