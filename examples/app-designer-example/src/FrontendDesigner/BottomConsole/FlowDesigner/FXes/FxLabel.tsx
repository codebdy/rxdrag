import { memo, useCallback, useState } from "react"
import TreeNodeLabel from "../../common/TreeNodeLabel"
import { Button, Space } from "antd"
import { DeleteOutlined, HolderOutlined } from "@ant-design/icons"
import { useRemoveFlow } from "../../../../hooks/useRemoveFlow"
import { FlowPopover } from "../FlowPopover"
import { IFlow } from "../../../../interfaces/flow"
import { ActivityResource, IActivityNode } from "@rxdrag/minions-logicflow-editor"
import { useTransMaterial } from "@rxdrag/logicflow-editor-antd5";
import { IActivityMaterial, NodeType } from "@rxdrag/minions-schema"
import { fxFlowMaterial } from "@rxdrag/minions-react-materials"
import { ID, createId } from "@rxdrag/shared"
import styled from "styled-components"

const Label = styled.div`
  display: flex;
  align-items: center;
`;

const DragHandler = styled.div`
  cursor: move;
  padding: 0 8px;
  padding-left: 0;
`
export const FxLabel = memo((props: {
  selected?: ID
  fx: IFlow,
}) => {
  const { selected, fx } = props;
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
        createNode={() => {
          const node: IActivityNode = {
            id: createId(),
            label: fx.label || fx.name,
            type: fxFlowMaterial.activityType,
            activityName: fxFlowMaterial.activityName,
            inPorts: fx.metas?.nodes.filter(node => node.type === NodeType.Start).map(nd => {
              const portId = nd.id;
              return {
                id: portId,
                name: nd.name || portId,
                label: nd.label,
              }
            }),
            outPorts: fx.metas?.nodes.filter(node => node.type === NodeType.End).map(nd => {
              const portId = nd.id;
              return {
                id: portId,
                name: nd.name || portId,
                label: nd.label,
              }
            }),
            config: {
              fxId: fx.id
            }
          }
          return node
        }}
      >
        {
          (onStartDrag) => {
            return <Label >
              {
                selected !== fx.id &&
                <DragHandler onMouseDown={onStartDrag}>
                  <HolderOutlined />
                </DragHandler>
              }
              {fx.name}
            </Label>
          }
        }
      </ActivityResource>
    </TreeNodeLabel>
  )
})