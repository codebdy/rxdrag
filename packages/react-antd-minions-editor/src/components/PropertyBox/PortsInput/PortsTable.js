import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo, useCallback, useMemo, useState } from 'react';
import { Space } from 'antd';
import { Button, Table } from 'antd';
import styled from 'styled-components';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { EditableCell } from './EditableCell';
import { EditableRow } from './EditableRow';
import { useTrans } from '../../../hooks/useTrans';
import { createUuid } from '@rxdrag/shared';
const Container = styled.div `
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
`;
const Footer = styled.div `
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
`;
const components = {
    body: {
        row: EditableRow,
        cell: EditableCell,
    },
};
export const PortsTable = memo((props) => {
    const { onClose, value, onChange, type } = props;
    const t = useTrans();
    const dataSource = useMemo(() => {
        return value?.map(meta => {
            return {
                key: meta.id,
                name: meta.name,
                label: meta.label,
            };
        }) || [];
    }, [value]);
    const [count, setCount] = useState(2);
    const handleDelete = useCallback((key) => {
        const newData = value?.filter((item) => item.id !== key);
        onChange?.(newData);
    }, [onChange, value]);
    const defaultColumns = useMemo(() => [
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
            render: (_, record) => dataSource.length >= 1 ? (_jsx(Button, { type: 'text', icon: _jsx(DeleteOutlined, {}), onClick: () => handleDelete(record.key || "") })) : null,
        },
    ], [dataSource.length, handleDelete, t]);
    const handleAdd = useCallback(() => {
        const newData = {
            id: createUuid(),
            name: `input${count}`,
            label: `${t("$" + type)} ${count}`,
        };
        onChange?.([...value || [], newData]);
        setCount(count + 1);
    }, [count, onChange, t, type, value]);
    const handleSave = useCallback((row) => {
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
            onCell: (record) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave,
            }),
        };
    }), [defaultColumns, handleSave]);
    return (_jsxs(Container, { children: [_jsx(Table, { components: components, rowClassName: () => 'editable-row', size: "small", bordered: true, dataSource: dataSource, columns: columns, pagination: false }), _jsx(Button, { onClick: handleAdd, type: "dashed", style: { marginTop: 8 }, icon: _jsx(PlusOutlined, {}), children: t("$add") }), _jsx(Footer, { children: _jsx(Space, { children: _jsx(Button, { type: "primary", onClick: onClose, children: t("$close") }) }) })] }));
});
