import { jsx as _jsx } from "react/jsx-runtime";
// expandedRowRender 作为Slot，可以实现嵌套表格
// row render ，设置ObjectField
// cell render, 行内编辑的话需要这个（外置编辑组件+也逻辑编排的话，也可能用不上）
// rowSelection 复杂的属性配置
// rowExpandable 可作为Row的属性
// Table.EXPAND_COLUMN, 展开列
// Table.SELECTION_COLUMN， 选择列
// colSpan
// rowSpan
// 当数据中有 children 字段时会自动展示为树形表格
// columns dataSource pagination
// 固定表头， 固定列， scroll， Column.fixed
// column.ellipsis 单元格自动省略，column.ellipsis.showTitle 关闭单元格内容自动省略后默认的 title 提示, 使用 Tooltip 替代
// summary 作为slot
//拖拽排序，拖拽手柄，自增表格实现
// designer自带属性编辑组件
import { memo, useCallback, useMemo, useState } from "react";
import { createUuid } from "react-shells/ant5/SettingsForm/components/ReactionsInput/ReactionsEditor/utils";
import { ArrayField } from "runner/fieldy/components/ArrayField/ArrayField";
import { Table as AntdTable } from "antd";
import { useComponentSchema } from "runner/ComponentRender/hooks/useComponentSchema";
import { ComponentView } from "runner/ComponentRender/ComponentView";
import { ObjectField } from "runner/fieldy/components/ObjectField";
import { useFieldState } from "runner/fieldy/hooks/useFieldState";
const TableCell = ({ fieldMeta, record, children, ...restProps }) => {
    const parentField = useFieldState();
    return _jsx("td", { ...restProps, children: fieldMeta?.name && fieldMeta.params?.withBind
            ? parentField?.value?.[fieldMeta.name]?.toString()
            : children });
};
// 本控件强依赖ComponentRender
export const Table = memo((props) => {
    const { header, footer, dataSource, pagination, summary, pageSize, rowKey = "id", ...other } = props;
    const [id] = useState(createUuid());
    const nodeSchema = useComponentSchema();
    const columns = useMemo(() => {
        return nodeSchema?.children?.map(child => {
            return {
                ...child?.props,
                render: () => {
                    return _jsx(ComponentView, { node: child });
                },
                onCell: (record, index) => ({
                    record,
                    fieldMeta: child["x-field"],
                }),
            };
        });
    }, [nodeSchema?.children]);
    const handleChange = useCallback(() => {
    }, []);
    const TableRow = useMemo(() => (props) => {
        const { index, ...other } = props;
        const row = dataSource?.nodes?.[index];
        return (index !== undefined
            ? _jsx(ObjectField, { name: index?.toString() || "", value: row, children: _jsx("tr", { ...other }) })
            : _jsx("tr", { ...other }));
    }, [dataSource?.nodes]);
    return (_jsx(ArrayField, { name: id, value: dataSource?.nodes, children: _jsx(AntdTable, { columns: columns, dataSource: dataSource?.nodes, rowKey: rowKey, onRow: (_, index) => ({ index }), components: {
                body: {
                    row: TableRow,
                    cell: TableCell,
                },
            }, pagination: pagination === false
                ? pagination
                : {
                    position: pagination && [pagination],
                    pageSize: pageSize,
                }, summary: (pageData) => {
                return (summary);
            }, onChange: handleChange, ...other }) }));
});
