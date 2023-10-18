import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import { memo } from "react"
import { useTranslation } from "react-i18next";
import "./style.less";
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Type, Types } from "../../../meta/Type";
import { ArgMeta } from "../../../meta/MethodMeta";
import { createUuid } from "shared";
import { LazyInput } from "./LazyInput";
import { useGetTypeLabel } from "../../../hooks/useGetTypeLabel";
import { useMetaId } from "../../../hooks/useMetaId";
import { ArgTypeInput } from "./ArgTypeInput";

// const SortableItem: any = SortableElement((props: React.HTMLAttributes<HTMLTableRowElement>) => (
//   <tr {...props} />
// ));
// const SortableBody: any = SortableContainer((props: React.HTMLAttributes<HTMLTableSectionElement>) => (
//   <tbody {...props} />
// ));
export const ArgsInput = memo((
  props: {
    value?: ArgMeta[],
    onChange?: (value?: ArgMeta[]) => void,
  }
) => {
  const { value, onChange } = props;
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<ArgMeta[]>([]);
  const metaId = useMetaId();
  const getTypeLabel = useGetTypeLabel(metaId);

  const reset = useCallback(() => {
    setItems(value?.map((arg, index) => ({ ...arg, index })) || [])
  }, [value]);

  useEffect(() => {
    reset();
  }, [reset])

  const { t } = useTranslation();
  const handleNameChange = useCallback((uuid: string, name: string) => {
    setItems(items => {
      return items.map(item => {
        return item.uuid === uuid ? { ...item, name } : item
      })
    })
  }, [])
  const handleTypeChange = useCallback((uuid: string, type: Type, typeUuid?: string) => {
    setItems(items => {
      return items.map(item => {
        return item.uuid === uuid
          ?
          {
            ...item,
            type,
            typeLabel: getTypeLabel(type),
            typeUuid,
          }
          : item
      })
    })
  }, [getTypeLabel])

  const handleRemove = useCallback((uuid: string) => {
    setItems(items => items.filter(item => item.uuid !== uuid));
  }, [])

  const columns: ColumnsType<ArgMeta> = useMemo(() => [
    {
      title: t("Name"),
      dataIndex: 'name',
      className: 'drag-visible',
      render: (_, { uuid, name }) => (
        <LazyInput
          value={name}
          style={{ width: 150 }}
          onChange={
            (value) => handleNameChange(uuid, value as any)
          }
        />
      ),
    },
    {
      title: t("Type"),
      dataIndex: 'type',
      className: 'drag-visible',
      width: 332,
      render: (_, { uuid, type, typeUuid }) => (
        <ArgTypeInput uuid={uuid} type={type} typeUuid={typeUuid} onTypeChange={handleTypeChange as any} />
      ),
    },

    {
      dataIndex: 'operate',
      className: 'drag-visible',
      width: 80,
      render: (_, { uuid }) => (
        <Button
          shape="circle"
          type="text"
          icon={<DeleteOutlined />}
          onClick={() => handleRemove(uuid)}
        />
      ),
    },
  ], [handleNameChange, handleRemove, handleTypeChange, t]);


  // const onSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
  //   if (oldIndex !== newIndex) {
  //     const newData = arrayMoveImmutable(items.slice(), oldIndex, newIndex).filter(
  //       (el: ArgMeta) => !!el,
  //     );
  //     setItems(newData);
  //   }
  // };

  // const DraggableContainer = (props: SortableContainerProps) => (
  //   <SortableBody
  //     useDragHandle
  //     disableAutoscroll
  //     helperClass="row-dragging"
  //     onSortEnd={onSortEnd}
  //     {...props}
  //   />
  // );

  // const DraggableBodyRow: React.FC<any> = ({ className, style, ...restProps }) => {
  //   // function findIndex base on Table rowKey props and should always be a right array index
  //   const index = items.findIndex(x => x.index === restProps['data-row-key']);
  //   return <SortableItem index={index} {...restProps} />;
  // };

  const handleAdd = useCallback(() => {
    setItems(items => {
      return [
        ...items,
        {
          uuid: createUuid(),
          name: "arg",
          type: Types.String,
          typeLabel: getTypeLabel(Types.String),
        }
      ]
    })
  }, [getTypeLabel])

  const showModal = useCallback(() => {
    setOpen(true)
  }, [])

  const handleOk = useCallback(() => {
    setOpen(false);
    onChange && onChange(items);
  }, [onChange, items])

  const handleCancel = useCallback(() => {
    setOpen(false);
    reset();
  }, [reset])


  return (
    <>
      <Button block onClick={showModal}>
        {t("UmlEditor.ConfigArgs")}
      </Button>
      <Modal
        className="args-input-modal"
        forceRender
        title={t("UmlEditor.ConfigArgs")}
        width={700}
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={t("Confirm")}
        cancelText={t("Cancel")}
      >
        <div className="args-input-body">
          <Table
            pagination={false}
            dataSource={items}
            columns={columns}
            rowKey="uuid"
          />
          <Button
            type="dashed"
            block
            icon={<PlusOutlined />}
            onClick={handleAdd}
          >
            {t("Add")}
          </Button>
        </div>
      </Modal>
    </>
  )
})