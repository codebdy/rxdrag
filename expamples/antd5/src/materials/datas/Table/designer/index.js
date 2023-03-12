import { jsx as _jsx } from "react/jsx-runtime";
import { Table } from "antd";
import { ComponentDesignerView } from "core-react/ComponentTreeWidget/ComponentDesignerView";
import { useNode } from "core-react/hooks/useNode";
import { useTreeNodes } from "core-react/hooks/useTreeNodes";
import { forwardRef, memo, useMemo } from "react";
export const TableDesigner = memo(forwardRef((props, ref) => {
    const { header, footer, summary, dataSource, pagination, ...other } = props;
    const node = useNode();
    const childNodes = useTreeNodes(node?.children || []);
    const columns = useMemo(() => {
        return childNodes?.map(child => ({
            ...child?.meta?.props,
            render: () => {
                return _jsx(ComponentDesignerView, { nodeId: child?.id });
            }
        }));
    }, [childNodes]);
    return (_jsx(Table, { ref: ref, columns: columns, title: header && (() => header), footer: footer && (() => footer), dataSource: [{ key: "1" }], pagination: pagination === false ? pagination : { position: pagination && [pagination] }, ...other, summary: (pageData) => {
            return (summary);
        } }));
}));
