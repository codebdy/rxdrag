import { useResourceNode } from "@rxdrag/react-core"
import { Col } from "antd"
import { useToken } from "antd/es/theme/internal"
import { memo } from "react"
import "./style.less"

export type ComponentResourceWidgetProps = {
  name: string
}
export const ComponentResourceWidget = memo((props: ComponentResourceWidgetProps) => {
  const { name } = props;
  //const [resourceNode, setResourceNode] = useState<IResourceNode>()
  //const registerMaterial = useRegisterComponentMaterial()
  const resourceNode = useResourceNode(name)
  // useEffect(() => {
  //   if (registerMaterial && material) {
  //     setResourceNode(registerMaterial(material))
  //   }
  // }, [material, registerMaterial])
  const [, token] = useToken()

  return (
    resourceNode
      ? <Col span={8}>
        <div className="resource-widget" {...resourceNode?.rxProps}>
          <div className="resource-icon" style={{ backgroundColor: token.colorBorderSecondary, color: resourceNode?.color }} >
            {resourceNode?.icon}
            {/* <div style={{ display: "none" }}>
            {
              //为了在画布里面拿到style，这里渲染一遍 
            }
            <Component />
          </div> */}
          </div>
          <div className="resource-text">{resourceNode?.title}</div>
        </div>
      </Col>
      : <></>
  )
})