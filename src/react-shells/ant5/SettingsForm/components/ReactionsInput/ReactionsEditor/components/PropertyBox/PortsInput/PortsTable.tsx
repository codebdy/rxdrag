import React, { memo, useState } from 'react';
import { Space } from 'antd';
import { Button, Table } from 'antd';
import type { FormInstance } from 'antd/es/form';
import styled from 'styled-components';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { EditableCell } from './EditableCell';
import { EditableRow } from './EditableRow';

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

export const EditableContext = React.createContext<FormInstance<any> | null>(null);

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
  key: React.Key;
  name: string;
  label: string;
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

export const PortsTable: React.FC = memo((

) => {
  const [dataSource, setDataSource] = useState<DataType[]>([
    {
      key: '0',
      name: 'input0',
      label: '输入 0',
    },
    {
      key: '1',
      name: 'input1',
      label: '输入 1',
    },
  ]);

  const [count, setCount] = useState(2);

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
      title: '名称',
      dataIndex: 'name',
      width: '40%',
      editable: true,
    },
    {
      title: '标题',
      dataIndex: 'label',
      width: '40%',
      editable: true,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (_, record: { key?: React.Key }) =>
        dataSource.length >= 1 ? (
          <Button type='text' icon={<DeleteOutlined />} onClick={() => handleDelete(record.key || "")} />
        ) : null,
    },
  ];

  const handleAdd = () => {
    const newData: DataType = {
      key: count,
      name: `input${count}`,
      label: `输入 ${count}`,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
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
  });

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
        添加
      </Button>
      <Footer>
        <Space>
          <Button type="primary">关闭</Button>
        </Space>
      </Footer>
    </Container>
  );
});
