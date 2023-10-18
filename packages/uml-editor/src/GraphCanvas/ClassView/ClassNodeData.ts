import { ClassMeta } from "../../meta/ClassMeta";
import { X6NodeMeta } from "../../meta/X6NodeMeta";

export type ClassNodeData = X6NodeMeta & ClassMeta & {
  packageName?: string;
  backgroundColor?: string;
  textColor?: string;
  themeMode: 'dark'|'light';
  // selectedId?: string,
  //pressedLineType?: RelationType,
  //drawingLine:LineAction|undefined,
  //themeMode: "dark"|"light"
}