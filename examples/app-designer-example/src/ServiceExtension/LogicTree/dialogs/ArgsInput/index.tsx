import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import { memo } from "react"
import "./style.less";
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { LazyInput } from "./LazyInput";
import { ArgTypeInput } from "./ArgTypeInput";
import { ArgMeta } from "../../../../interfaces/extension";
import { useTranslate } from "@rxdrag/react-locales";
import { Type, Types } from "@rxdrag/uml-schema";
import { createId } from "@rxdrag/shared";

export const ArgsInput = memo((
  props: {
    value?: ArgMeta[],
    onChange?: (value?: ArgMeta[]) => void,
  }
) => {
  const { value, onChange } = props;
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<ArgMeta[]>([]);

  const reset = useCallback(() => {
    setItems(value?.map((arg, index) => ({ ...arg, index })) || [])
  }, [value]);

  useEffect(() => {
    reset();
  }, [reset])

  const t = useTranslate();
  const handleNameChange = useCallback((id: string, name: string) => {
    setItems(items => {
      return items.map(item => {
        return item.id === id ? { ...item, name } : item
      })
    })
  }, [])
  const handleTypeChange = useCallback((id: string, type: Type, typeId?: string) => {
    setItems(items => {
      return items.map(item => {
        return item.id === id
          ?
          {
            ...item,
            type,
            typeUuid: typeId,
          }
          : item
      })
    })
  }, [])

  const handleRemove = useCallback((id: string) => {
    setItems(items => items.filter(item => item.id !== id));
  }, [])

  const columns: ColumnsType<ArgMeta> = useMemo(() => [
    {
      title: t("Name"),
      dataIndex: 'name',
      className: 'drag-visible',
      render: (_, { id, name }) => (
        <LazyInput
          value={name}
          style={{ width: 150 }}
          onChange={
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (value) => handleNameChange(id, value as any)
          }
        />
      ),
    },
    {
      title: t("Type"),
      dataIndex: 'type',
      className: 'drag-visible',
      width: 332,
      render: (_, { id, type, typeId }) => (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <ArgTypeInput id={id} type={type} typeId={typeId} onTypeChange={handleTypeChange as any} />
      ),
    },

    {
      dataIndex: 'operate',
      className: 'drag-visible',
      width: 80,
      render: (_, { id }) => (
        <Button
          shape="circle"
          type="text"
          icon={<DeleteOutlined />}
          onClick={() => handleRemove(id)}
        />
      ),
    },
  ], [handleNameChange, handleRemove, handleTypeChange, t]);



  const handleAdd = useCallback(() => {
    setItems(items => {
      return [
        ...items,
        {
          id: createId(),
          name: "arg",
          type: Types.String,
        }
      ]
    })
  }, [])

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
        {t("ConfigArgs")}
      </Button>
      <Modal
        className="args-input-modal"
        forceRender
        title={t("ConfigArgs")}
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