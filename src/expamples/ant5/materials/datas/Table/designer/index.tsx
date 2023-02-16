import { Table, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { useGetNode } from "core-react/hooks/useGetNode";
import { useNode } from "core-react/hooks/useNode";
import { TableProps } from "expamples/ant5/components/datas/Table"
import { forwardRef, memo, useMemo } from "react"
import { TableColumnDesigner } from "../../TableColumn/designer";

const { Text } = Typography;

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
  const node = useNode()
  const getNode = useGetNode()
  const colums = useMemo(() => {
    return node?.children?.map(childId => getNode(childId)).filter(child => child).map(child => ({
      title: 'Cash Assets',
      className: 'column-money',
      dataIndex: 'money',
      //align: 'right',
      render: () => {
        return <TableColumnDesigner rx-id={child?.id!} >哈哈</TableColumnDesigner>
      }
    }))
  }, [getNode, node?.children])

  return (
    <Table
      ref={ref}
      columns={colums as any}
      bordered
      title={header && (() => header)}
      footer={footer && (() => footer)}
      {...other}
      summary={(pageData) => {
        return (
          summary
        );
      }}
    />
  )
}))