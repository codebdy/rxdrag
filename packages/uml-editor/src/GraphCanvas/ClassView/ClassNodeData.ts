import { ClassMeta } from "@rxdrag/uml-schema";
import { X6NodeMeta } from "../../interfaces";

export type ClassNodeData = X6NodeMeta & ClassMeta & {
  packageName?: string;
  backgroundColor?: string;
  textColor?: string;
  themeMode: 'dark' | 'light';
  t: (key: string) => string | undefined;
  // selectedId?: string,
  //pressedLineType?: RelationType,
  //drawingLine:LineAction|undefined,
  //themeMode: "dark"|"light"
}