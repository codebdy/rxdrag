import { useCallback, useMemo, useState } from "react"
import { IReactionMaterial } from "runner/minions"
import { Minions } from "runner/minions/components"
import { IComponentsParams, PreviewComponentsContext } from "./contexts"
import { IComponents } from "./interfaces"

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
      <Minions materials={reactionMaterials}>
        {
          children
        }
      </Minions>
    </PreviewComponentsContext.Provider>
  )
}