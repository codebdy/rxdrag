import { ComponentResourceWidget } from "@rxdrag/react-antd-shell"
import { useSettersTranslate } from "@rxdrag/react-core"
import { memo } from "react"
import { ResourceCollapsePanel } from "./ResourceCollapsePanel"
import styled from "styled-components"
import { ResourceGroup } from "example-common"

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
`

export const ResourceWidget = memo((
  props: {
    resources?: ResourceGroup[]
  }
) => {
  const { resources } = props;
  const t = useSettersTranslate()
  //const registerMaterial = useRegisterComponentMaterials()
  //注册通用物料
  // useEffect(() => {
  //   registerMaterial(FieldMaterial)
  // }, [registerMaterial])

  return (
    <Container>
      {
        resources?.map((group => {
          return (
            <ResourceCollapsePanel key={group.titleKey} title={t(group.titleKey)} defaultExpand>
              {
                group.items.map((name => {
                  return (
                    <ComponentResourceWidget key={name} name={name} />
                  )
                }))
              }
            </ResourceCollapsePanel>
          )
        }))
      }
    </Container>
  )
})