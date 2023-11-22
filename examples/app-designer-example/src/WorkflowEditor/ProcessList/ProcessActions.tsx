import { MoreOutlined, EditOutlined, DeleteOutlined, LoadingOutlined } from "@ant-design/icons";
import { useTranslate } from "@rxdrag/react-locales";
import { Dropdown, Button } from "antd";
import React, { memo, useCallback } from "react"
import { useRemoveProcess } from "../../hooks/useRemoveProcess";
import { ID } from "@rxdrag/shared";

const ProcessActions = memo((
  props: {
    pageId: ID,
    onVisibleChange: (visible: boolean) => void,
    onEdit: () => void,
  }
) => {
  const { pageId, onVisibleChange, onEdit } = props;
  const t = useTranslate();
  const [remove, { loading, }] = useRemoveProcess({
    onComplete: () => {
      onVisibleChange(false);
    }
  });

  const handleEdit = useCallback(() => {
    onEdit();
    onVisibleChange(false);
  }, [onEdit, onVisibleChange]);

  const handleDelete = useCallback(() => {
    remove(pageId);
  }, [pageId, remove]);


  return (
    <Dropdown
      menu={{
        items: [
          {
            icon: <EditOutlined />,
            label: t("Edit"),
            key: '1',
            onClick: (e => {
              e.domEvent.stopPropagation();
              handleEdit();
            })
          },
          {
            icon: <DeleteOutlined />,
            label: t("Delete"),
            key: '2',
            onClick: (e => {
              e.domEvent.stopPropagation();
              handleDelete();
            })
          },
        ]
      }}
      trigger={['click']}
      onOpenChange={onVisibleChange}
      disabled={loading}
    >
      <Button shape='circle' type="text" size='small' onClick={e => e.stopPropagation()}>
        {
          loading ?
            <LoadingOutlined />
            : <MoreOutlined color="inherit" />
        }
      </Button>
    </Dropdown>
  )
})

export default ProcessActions;