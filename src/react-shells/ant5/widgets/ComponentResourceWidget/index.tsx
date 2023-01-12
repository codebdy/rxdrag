import { Col } from "antd"
import { useToken } from "antd/es/theme/internal"
import { IResourceNode } from "core"
import { IComponentMaterial } from "core-react"
import { useRegisterComponentMaterial } from "core-react/hooks/useRegisterComponentMaterial"
import { memo, useEffect, useState } from "react"
import "./style.less"

export type ComponentResourceWidgetProps = {
  meterial: IComponentMaterial
}
export const ComponentResourceWidget = memo((props: ComponentResourceWidgetProps) => {
  const { meterial } = props;
  const [resourceNode, setResourceNode] = useState<IResourceNode>()
  const registerMaterial = useRegisterComponentMaterial()

  useEffect(() => {
    if (registerMaterial && meterial) {
      setResourceNode(registerMaterial(meterial))
    }
  }, [meterial, registerMaterial])
  const [, token] = useToken()

  return (
    <Col span={8}>
      <div className="resource-widget" {...resourceNode?.rxProps}>
        <div className="resource-icon" style={{ backgroundColor: token.colorBorderSecondary, color: meterial?.resource?.color }} >
          {meterial.resource?.icon}
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