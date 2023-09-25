import React, { memo, useCallback, useMemo, useState } from 'react';
import { Space } from 'antd';
import { Button, Table } from 'antd';
import styled from 'styled-components';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { EditableCell } from './EditableCell';
import { EditableRow } from './EditableRow';
import { createId } from '@rxdrag/shared';
import { IPortDefine } from '@rxdrag/minions-schema';
import { useTrans } from '../../../hooks/useTrans';

const Container = styled.div`
  width: 400px;
  display: flex;
  flex-flow: column;
  .editable-cell {
    position: relative;
  }

  .editable-cell-value-wrap {
    padding: 5px 12px;
    cursor: pointer;
  }

  .editable-row:hover .editable-cell-value-wrap {
    padding: 4px 11px;
    border: 1px solid ${props => props.theme.token?.colorBorder};
    border-radius: 2px;
  }
`

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
`

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
  key: React.Key;
  name: string;
  label: string;
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

const components = {
  body: {
    row: EditableRow,
    cell: EditableCell,
  },
};

export const PortsTable = memo((
  props: {
    onClose: () => void,
    value?: IPortDefine[],
    onChange?: (value?: IPortDefine[]) => void,
    type: "input" | "output",
  }
) => {
  const { onClose, value, onChange, type } = props;
  const t = useTrans()
  const dataSource = useMemo(() => {
    return value?.map(meta => {
      return {
        key: meta.id,
        name: meta.name,
        label: meta.label,
      }
    }) || []
  }, [value])

  const [count, setCount] = useState(2);

  const handleDelete = useCallback((key: React.Key) => {
    const newData = value?.filter((item) => item.id !== key);
    onChange?.(newData);
  }, [onChange, value]);

  const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = useMemo(() => [
    {
      title: t("$name"),
      dataIndex: 'name',
      width: '40%',
      editable: true,
    },
    {
      title: t("$label"),
      dataIndex: 'label',
      width: '40%',
      editable: true,
    },
    {
      title: t("$operation"),
      dataIndex: 'operation',
      render: (_, record: { key?: React.Key }) =>
        dataSource.length >= 1 ? (
          <Button type='text' icon={<DeleteOutlined />} onClick={() => handleDelete(record.key || "")} />
        ) : null,
    },
  ], [dataSource.length, handleDelete, t]);

  const handleAdd = useCallback(() => {
    const newData: IPortDefine = {
      id: createId(),
      name: `input${count}`,
      label: `${t("$"+type)} ${count}`,
    };
    onChange?.([...value || [], newData]);
    setCount(count + 1);
  }, [count, onChange, t, type, value]);

  const handleSave = useCallback((row: DataType) => {
    const newData = [...value || []];
    const index = newData.findIndex((item) => row.key === item.id);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    onChange?.(newData);
  }, [onChange, value]);


  const columns = useMemo(() => defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  }), [defaultColumns, handleSave]);

  return (
    <Container>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        size="small"
        bordered
        dataSource={dataSource}
        columns={columns as ColumnTypes}
        pagination={false}
      />
      <Button onClick={handleAdd} type="dashed" style={{ marginTop: 8 }} icon={<PlusOutlined />}>
        {t("$add")}
      </Button>
      <Footer>
        <Space>
          <Button type="primary" onClick={onClose}>{t("$close")}</Button>
        </Space>
      </Footer>
    </Container>
  );
});
