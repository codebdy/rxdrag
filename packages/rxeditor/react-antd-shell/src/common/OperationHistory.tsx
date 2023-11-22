import { ISnapshot } from "@rxdrag/core";
import { useSnapshots, useActivedDocument } from "@rxdrag/react-core";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import React, { memo, useCallback, useMemo } from "react"

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


export const OperationHistory = memo(() => {
  const { snapshotIndex, history } = useSnapshots()
  const doc = useActivedDocument()
  const makeKey = useCallback((index: number, snap?: ISnapshot) => {
    return index + "" + snap?.createdAt
  }, [])

  const rowSelection = useMemo(() => ({
    onChange: (selectedRowKeys: React.Key[]) => {
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
  )
})