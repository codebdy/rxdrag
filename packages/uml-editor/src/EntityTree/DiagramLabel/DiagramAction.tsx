import { MoreOutlined, EditOutlined, DeleteOutlined, LockOutlined } from "@ant-design/icons";
import { Dropdown, Button } from "antd";
import { memo, useCallback } from "react"
import { useGetPackage } from "../../hooks/useGetPackage";
import { useDeleteDiagram } from "../../hooks/useDeleteDiagram";
import { useMetaId } from "../../hooks/useMetaId";
import { DiagramMeta } from "../../interfaces";
import { useTranslate } from "@rxdrag/react-locales";

const DiagramAction = memo((
  props: {
    diagram: DiagramMeta,
    onEdit: () => void,
    onVisibleChange: (visible: boolean) => void,
  }
) => {
  const { diagram, onEdit, onVisibleChange } = props;
  const metaId = useMetaId();
  const getPagcage = useGetPackage(metaId)
  const deleteDiagram = useDeleteDiagram(metaId)
  const t = useTranslate();

  const handleDelete = useCallback(() => {
    deleteDiagram(diagram.uuid)
    onVisibleChange(false);
  }, [deleteDiagram, onVisibleChange, diagram.uuid]);


  return (
    getPagcage(diagram.packageUuid)?.system ?
      <Button type="text" shape='circle' size='small' style={{ color: "inherit" }}>
        <LockOutlined />
      </Button>
      :
      <Dropdown
        menu={{
          items: [
            {
              icon: <EditOutlined />,
              label: t("Edit"),
              key: '6',
              onClick: e => {
                e.domEvent.stopPropagation();
                onEdit();
                onVisibleChange(false);
              }
            },
            {
              icon: <DeleteOutlined />,
              label: t("Delete"),
              key: '7',
              onClick: e => {
                e.domEvent.stopPropagation();
                handleDelete();
                onVisibleChange(false);
              }
            },
          ]
        }}
        onOpenChange={onVisibleChange}
        trigger={['click']}
      >
        <Button type="text" shape='circle' size='small' onClick={e => e.stopPropagation()} style={{ color: "inherit" }}>
          <MoreOutlined />
        </Button>
      </Dropdown>
  )
})

export default DiagramAction;