import { IResourceNode } from "@rxdrag/core"
import { IComponentMaterial, useRegisterComponentMaterial } from "@rxdrag/react-core"
import { Col } from "antd"
import { useToken } from "antd/es/theme/internal"
import { memo, useEffect, useState } from "react"
import "./style.less"

export type ComponentResourceWidgetProps = {
  material: IComponentMaterial
}
export const ComponentResourceWidget = memo((props: ComponentResourceWidgetProps) => {
  const { material } = props;
  const [resourceNode, setResourceNode] = useState<IResourceNode>()
  const registerMaterial = useRegisterComponentMaterial()

  useEffect(() => {
    if (registerMaterial && material) {
      setResourceNode(registerMaterial(material))
    }
  }, [material, registerMaterial])
  const [, token] = useToken()

  return (
    <Col span={8}>
      <div className="resource-widget" {...resourceNode?.rxProps}>
        <div className="resource-icon" style={{ backgroundColor: token.colorBorderSecondary, color: material?.resource?.color }} >
          {material.resource?.icon}
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
  )
})