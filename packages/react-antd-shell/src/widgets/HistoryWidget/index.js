import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useSnapshots, useActivedDocument } from "@rxdrag/react-core";
import { Table } from "antd";
import dayjs from "dayjs";
import { memo, useCallback, useMemo } from "react";
import { PaneContainer } from "../../layouts/ToggleAblePane/PaneContainer";
import { PanelContent } from "../../layouts/ToggleAblePane/PanelContent";
import { PaneTitle } from "../../layouts/ToggleAblePane/PaneTitle";
const columns = [
    {
        title: 'operation',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: 'date',
        dataIndex: 'date',
        key: 'date',
        align: "right"
    },
];
export const HistoryWidget = memo((props) => {
    const { display } = props;
    const { snapshotIndex, history } = useSnapshots();
    const doc = useActivedDocument();
    const makeKey = useCallback((index, snap) => {
        return index + "" + snap?.createdAt;
    }, []);
    const rowSelection = useMemo(() => ({
        onChange: (selectedRowKeys, selectedRows) => {
            for (let i = 0; i < history.length; i++) {
                if (makeKey(i, history[i]) === selectedRowKeys?.[0]) {
                    doc?.goto(i);
                    break;
                }
            }
        },
    }), [doc, history, makeKey]);
    const data = useMemo(() => {
        return history.map((snap, index) => {
            return {
                key: makeKey(index, snap),
                title: snap.actionType,
                date: dayjs(snap.createdAt).format('MM/DD HH:mm:ss'),
            };
        }).reverse();
    }, [history, makeKey]);
    return (_jsxs(PaneContainer, { style: { display: display ? undefined : "none" }, children: [_jsx(PaneTitle, { title: "history" }), _jsx(PanelContent, { children: _jsx(Table, { showHeader: false, size: "small", columns: columns, dataSource: data, pagination: false, rowSelection: {
                        selectedRowKeys: [makeKey(snapshotIndex, history[snapshotIndex])],
                        type: "radio",
                        ...rowSelection,
                    }, style: {
                        margin: 8
                    } }) })] }));
});
