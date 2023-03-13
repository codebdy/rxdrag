import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { ISnapshot } from "core";
import { useActivedDocument } from "core-react/hooks/useActivedDocument";
import { useSnapshots } from "core-react/hooks/useSnapshots";
import dayjs from "dayjs";
import React, { memo, useCallback, useMemo } from "react"
import { PaneContainer } from "react-shells/ant5/layouts/ToggleAblePane/PaneContainer"
import { PanelContent } from "react-shells/ant5/layouts/ToggleAblePane/PanelContent"
import { PaneTitle } from "react-shells/ant5/layouts/ToggleAblePane/PaneTitle"

interface DataType {
  key: string;
  date: string;
  title: string;
}
const columns: ColumnsType<DataType> = [
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


export const HistoryWidget = memo((
  props: {
    display: boolean,
  }
) => {
  const { display } = props
  const { snapshotIndex, history } = useSnapshots()
  const doc = useActivedDocument()
  const makeKey = useCallback((index: number, snap?: ISnapshot) => {
    return index + "" + snap?.createdAt
  }, [])

  const rowSelection = useMemo(() => ({
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      for (let i = 0; i < history.length; i++) {
        if (makeKey(i, history[i]) === selectedRowKeys?.[0]) {
          doc?.goto(i)
          break
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
      }
    }).reverse()
  }, [history, makeKey])

  return (
    <PaneContainer style={{ display: display ? undefined : "none" }}>
      <PaneTitle title="history" />
      <PanelContent>
        <Table
          showHeader={false}
          size="small"
          columns={columns}
          dataSource={data}
          pagination={false}
          rowSelection={{
            selectedRowKeys: [makeKey(snapshotIndex, history[snapshotIndex])],
            type: "radio",
            ...rowSelection,
          }}
          style={{
            margin: 8
          }}
        />
      </PanelContent>
    </PaneContainer>
  )
})