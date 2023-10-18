import { MoreOutlined, FileAddOutlined, EditOutlined, DeleteOutlined, LoadingOutlined } from "@ant-design/icons";
import { Dropdown, Button } from "antd";
import React, { memo, useCallback } from "react"
import { useShowError } from "hooks/useShowError";
import { useTranslation } from "react-i18next";
import { ID } from "shared";
import { useDeleteCategory } from "../hooks/useDeleteCategory";

const CategoryActions = memo((
  props: {
    id: ID,
    onVisibleChange: (visible: boolean) => void,
    onEdit: () => void,
    onAddPage: () => void,
  }
) => {
  const { id, onVisibleChange, onEdit, onAddPage } = props;
  const { t } = useTranslation();

  const [remove, { loading, error }] = useDeleteCategory({
    onCompleted: () => {
      onVisibleChange(false);
    }
  });

  useShowError(error);

  const handleAdd = useCallback(() => {
    onVisibleChange(false);
    onAddPage()
  }, [onAddPage, onVisibleChange]);

  const handleEdit = useCallback(() => {
    onVisibleChange(false);
    onEdit();
  }, [onEdit, onVisibleChange]);

  const handleDelete = useCallback(() => {
    remove(id)
  }, [remove, id]);

  return (
    <Dropdown
      menu={{
        items: [
          {
            icon: <FileAddOutlined />,
            label: t("AppBpmn.NewProcess"),
            key: '0',
            onClick: (e => {
              e.domEvent.stopPropagation();
              onVisibleChange(false);
              handleAdd();
            })
          },
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
            : <MoreOutlined />
        }
      </Button>
    </Dropdown>
  )
})

export default CategoryActions;