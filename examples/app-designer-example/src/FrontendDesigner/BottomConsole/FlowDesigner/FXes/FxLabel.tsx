import { memo, useCallback, useState } from "react"
import TreeNodeLabel from "../../common/TreeNodeLabel"
import { Button, Space } from "antd"
import { DeleteOutlined } from "@ant-design/icons"
import { useRemoveFlow } from "../../../../hooks/useRemoveFlow"
import { FlowPopover } from "../FlowPopover"
import { IFlow } from "../../../../interfaces/flow"
import { ActivityResource } from "@rxdrag/minions-logicflow-editor"
import { useTransMaterial } from "@rxdrag/logicflow-editor-antd5";
import { IActivityMaterial } from "@rxdrag/minions-schema"
import { fxFlowMaterial } from "@rxdrag/minions-react-materials"
import { DraggableText } from "../DraggableText";

export const FxLabel = memo((props: {
  fx: IFlow,
}) => {
  const { fx } = props;
  const [open, setOpen] = useState<boolean>()
  const [remove, { loading }] = useRemoveFlow()
  const t = useTransMaterial()

  const handleRemove = useCallback(() => {
    remove(fx.id)
  }, [remove, fx.id])

  return (
    <TreeNodeLabel
      fixedAction={open}
      action={
        <Space>
          <FlowPopover
            title="编辑子流"
            scope={fx.scope}
            ownerId={fx.ownerId}
            type={fx.type}
            open={open}
            flow={fx}
            onOpenChange={setOpen}
          />
          <Button
            type="text"
            size="small"
            icon={<DeleteOutlined />}
            loading={loading}
            onClick={handleRemove}
          />
        </Space>
      }
    >
      <ActivityResource
        material={t(fxFlowMaterial as IActivityMaterial<React.ReactNode>)}
        config={
          {
            fxId: fx.id
          }
        }
      >
        {
          (onStartDrag) => {
            return <DraggableText onMouseDown={onStartDrag}>
              {fx.name}
            </DraggableText>
          }
        }
      </ActivityResource>
    </TreeNodeLabel>
  )
})