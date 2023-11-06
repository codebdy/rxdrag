import { IMaterial } from "@rxdrag/react-core";
import { Table } from "antd";
import { FooterMaterial } from "../../common/Footer";
import { HeaderMaterial } from "../../common/Header";
import { ListItemMaterial } from "../ListItem";
import { locales } from "./locales";
import { materialSchema } from "./schema";

const name = "TableSummaryRow"
export const TableCellMaterial: IMaterial = {
  componentName: name,
  component: Table.Summary.Row,
  designer: Table.Summary.Row,
  designerLocales: locales,
  propsSchema: materialSchema,
  designerProps: {
    dataSource: [{ key: "1" }]
  },

  slots: {
    renderItem: ListItemMaterial,
    header: HeaderMaterial,
    footer: FooterMaterial,
  },
  behaviorRule: {
    droppable: true,
    noPlaceholder: true,
  }
}