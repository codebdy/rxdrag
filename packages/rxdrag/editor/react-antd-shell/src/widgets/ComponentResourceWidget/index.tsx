import { useResourceNode, useResourceTranslate } from "@rxdrag/react-core"
import { Col } from "antd"
import { useToken } from "antd/es/theme/internal"
import { memo } from "react"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  user-select: none;
  cursor: move;
  margin-bottom: 16px;

  .resource-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    width: 50px;
    font-size: 24px;
    border-radius: 8px;
  }

  .resource-text {
    display: flex;
    justify-content: center;
    margin-top: 8px;
    align-items: center;
  }
`

export type ComponentResourceWidgetProps = {
  name: string
}
export const ComponentResourceWidget = memo((props: ComponentResourceWidgetProps) => {
  const { name } = props;
  //const [resourceNode, setResourceNode] = useState<IResourceNode>()
  //const registerMaterial = useRegisterComponentMaterial()
  const resourceNode = useResourceNode(name)
  const t = useResourceTranslate()
  // useEffect(() => {
  //   if (registerMaterial && material) {
  //     setResourceNode(registerMaterial(material))
  //   }
  // }, [material, registerMaterial])
  const [, token] = useToken()

  return (
    resourceNode
      ? <Col span={8}>
        <Container className="resource-widget" {...resourceNode?.rxProps}>
          <div className="resource-icon" style={{ backgroundColor: token.colorBorderSecondary, color: resourceNode?.color }} >
            {resourceNode?.icon}
            {/* <div style={{ display: "none" }}>
            {
              //为了在画布里面拿到style，这里渲染一遍 
            }
            <Component />
          </div> */}
          </div>
          <div className="resource-text">{t(resourceNode?.title)}</div>
        </Container>
      </Col>
      : <></>
  )
})