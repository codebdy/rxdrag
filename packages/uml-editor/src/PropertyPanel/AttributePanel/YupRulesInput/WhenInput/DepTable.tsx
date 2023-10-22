import React, { memo, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { InputRef } from 'antd';
import { Button, Form, Input, Table } from 'antd';
import type { FormInstance } from 'antd/es/form';
import styled from 'styled-components';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useTranslate } from '@rxdrag/react-locales';

const StyledTable = styled(Table)`
  .ant-table-container{
    border-radius: 0;
    .ant-table-placeholder{
      height: 40px;
      .ant-empty{
        display: none;
      }
    }
  }
`

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 8px;
  color:${props => props.theme?.token?.colorTextSecondary};
`

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  name: string;
  age: string;
  address: string;
}

interface EditableRowProps {
  index: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
  key: React.Key;
  name: string;
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

export const DepTable = memo((
  props: {
    value?: string[],
    onChange?: (value?: string[]) => void
  }
) => {
  const { value, onChange } = props;
  const t = useTranslate()
  const dataSource = useMemo(() => value?.map((item, index) => ({ name: item, key: index })) || [], [value])

  const handleDelete = useCallback((key?: React.Key) => {
    const newData = value?.filter((item, index) => index !== key);
    onChange?.(newData);
  }, [onChange, value]);

  const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = useMemo(() => [
    {
      title: 'name',
      dataIndex: 'name',
      editable: true,
    },
    {
      title: 'operation',
      width: '60px',
      align: 'center',
      dataIndex: 'operation',
      render: (_, record: { key?: React.Key }) =>
        dataSource.length >= 1 ? (
          <Button
            icon={<DeleteOutlined />}
            type='text'
            size='small'
            onClick={() => handleDelete(record.key)}
          />
        ) : null,
    },
  ], [dataSource.length, handleDelete]);

  const handleAdd = useCallback(() => {
    onChange?.([...value || [], `fieldName`]);
  }, [onChange, value]);

  const handleSave = useCallback((row: DataType) => {
    const newData = [...value || []];
    const index = row.key as number;
    newData.splice(index, 1, row.name);
    onChange?.(newData);
  }, [onChange, value]);

  const components = useMemo(() => ({
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  }), []);

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
    <div>
      <Title>
        <span>{t("devItems")}</span>
        <Button
          onClick={handleAdd}
          type="text"
          icon={<PlusOutlined />}
        >
        </Button>
      </Title>

      <StyledTable
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns as ColumnTypes}
        showHeader={false}
        pagination={false}
        size='small'
      />
    </div>
  );
});
