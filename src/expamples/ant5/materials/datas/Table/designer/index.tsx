import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { TableProps } from "expamples/ant5/components/datas/Table"
import { forwardRef, memo } from "react"

interface DataType {
  key: string;
  name: string;
  money: string;
  address: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Cash Assets',
    className: 'column-money',
    dataIndex: 'money',
    align: 'right',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];


export const TableDesigner = memo(forwardRef<HTMLDivElement>((
  props: TableProps,
  ref
) => {
  const { header, footer, summary, ...other } = props

  return (
    <Table
      ref={ref}
      columns={[]}
      bordered
      title={header && (() => header)}
      footer={footer && (() => footer)}
      {...other}
    />
  )
}))