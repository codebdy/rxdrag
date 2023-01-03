import { Col } from "antd"
import { useToken } from "antd/es/theme/internal"
import { IResourceNode } from "core"
import { IMaterialResource } from "core-react"
import { useRegisterResource } from "core-react/hooks/useRegisterResource"
import { memo, useEffect, useState } from "react"
import "./style.less"

export type TemplateResourceWidgetProps = {
  resource: IMaterialResource
}
export const TemplateResourceWidget = memo((props: TemplateResourceWidgetProps) => {
  const { resource } = props;
  const [resourceNode, setResourceNode] = useState<IResourceNode>()
  const registerMaterial = useRegisterResource()
  useEffect(() => {
    if (registerMaterial && resource) {
      setResourceNode(registerMaterial(resource))
    }
  }, [resource, registerMaterial])
  const [, token] = useToken()

  return (
    <Col span={8}>
      <div className="resource-widget" {...resourceNode?.rxProps}>
        <div className="resource-icon" style={{ backgroundColor: token.colorBorderSecondary, color: resource?.color }} >
          {resource?.icon}
        </div>
        <div className="resource-text">{resourceNode?.title}</div>
      </div>
    </Col>
  )
})