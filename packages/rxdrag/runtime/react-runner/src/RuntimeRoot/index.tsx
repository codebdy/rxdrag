import { IComponents } from "@rxdrag/react-shared"
import React from "react"
import { useCallback, useMemo, useState } from "react"
import { PreviewComponentsContext } from "../contexts"
import { IComponentsParams } from "../interfaces"
import { ILocalesManager } from "@rxdrag/locales"
import { MinionsRoot } from "@rxdrag/minions-runtime-react"

export const RuntimeRoot = (props: {
  components?: IComponents,
  children: React.ReactNode,
  localesManager?: ILocalesManager,
}) => {
  const { components: initalComponents, children, localesManager } = props
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
    <MinionsRoot>
      <PreviewComponentsContext.Provider value={params}>
        {
          children
        }
      </PreviewComponentsContext.Provider>
    </MinionsRoot>
  )
}