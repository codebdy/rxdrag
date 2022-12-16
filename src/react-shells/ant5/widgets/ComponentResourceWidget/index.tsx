import { Col } from "antd"
import { useToken } from "antd/es/theme/internal"
import { IComponentMaterial } from "core-react"
import { useRegisterComponentMaterial } from "core-react/hooks/useRegisterComponentMaterial"
import { memo } from "react"
import "./style.less"

export type ComponentResourceWidgetProps = {
  meterial: IComponentMaterial
}
export const ComponentResourceWidget = memo((props: ComponentResourceWidgetProps) => {
  const { meterial } = props;
  const resoureNode = useRegisterComponentMaterial(meterial)

  const [, token] = useToken()
  const Component = meterial.component
  return (
    <Col span={8}>
      <div className="resource-widget" {...resoureNode?.rxProps}>
        <div className="resource-icon" style={{ backgroundColor: token.colorBorderSecondary, color: meterial.color }} >
          {meterial.icon}
          <div style={{ display: "none" }}>
            {/** 为了在画布里面拿到style，这里渲染一遍 */}
            <Component />
          </div>
        </div>
        <div className="resource-text">{resoureNode?.title}</div>
      </div>
    </Col>
  )
})