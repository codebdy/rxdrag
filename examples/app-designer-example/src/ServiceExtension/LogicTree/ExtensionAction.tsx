import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import { memo } from "react"
import { useTranslate } from "@rxdrag/react-locales";

export const ExtensionAction = memo((
  props: {
    removing?: boolean,
    onConfirmOpenChange?: (open: boolean) => void,
    onRemove?: () => void
    onEdit?: () => void
  }
) => {
  const { removing, onEdit, onRemove, onConfirmOpenChange } = props;
  const t = useTranslate()

  return (
    <>
      <Button
        type="text"
        shape='circle'
        size='small'
        onClick={onEdit}
        icon = {<EditOutlined />}
      >        
      </Button>
      <Popconfirm
        title={t("DeleteConfirm")}
        description={t("DeleteConfirmDescription")}
        onOpenChange={onConfirmOpenChange}
        onConfirm={onRemove}
        okText={t("Yes")}
        cancelText={t("No")}
      >
        <Button
          type="text"
          shape='circle'
          size='small'
          loading={removing}
          icon = {<DeleteOutlined />}
        >          
        </Button>
      </Popconfirm>
    </>
  )
})
