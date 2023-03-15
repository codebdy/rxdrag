import React from "react"
import { useCallback, useMemo, useState } from "react"
import { IComponentsParams, PreviewComponentsContext } from "../../react-core/src/contexts"
import { IReactionMaterial } from "@rxdrag/schema"
import { IComponents } from "@rxdrag/react-shared"

export const PreviewRoot = (props: {
  components?: IComponents,
  children: React.ReactNode,
  reactionMaterials?: IReactionMaterial[]
}) => {
  const { components: initalComponents, children, reactionMaterials = [] } = props
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