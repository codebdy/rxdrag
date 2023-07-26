import React from "react"
import { useCallback, useMemo, useState } from "react"
import { DesignComponentsContext, IDesignerComponentsParams } from "./contexts"
import { IComponents } from "@rxdrag/react-shared"

export const DesignRoot = (props: {
  components?: IComponents,
  setters?: IComponents,
  children: React.ReactNode,
}) => {
  const { components: initialComponents, setters: initialTools, children } = props
  const [components, setComponents] = useState<IComponents>({})
  const [setters, setTools] = useState<IComponents>({})
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
      setters: { ...initialTools, ...setters },
      registerComponents: handleRegister,
      registerTools: handleRegisterTools,
    }
  }, [components, handleRegister, handleRegisterTools, initialComponents, initialTools, setters])

  return (
    <DesignComponentsContext.Provider value={params}>
      {
        children
      }
    </DesignComponentsContext.Provider>
  )
}