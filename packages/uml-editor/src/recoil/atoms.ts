import { ID } from "@rxdrag/shared";
import { PackageMeta, ClassMeta, RelationMeta, RelationType } from "@rxdrag/uml-schema";
import { atom, atomFamily } from "recoil";
import { UmlEditorOptions } from "../UmlEditorInner";
import { DiagramMeta, X6NodeMeta, X6EdgeMeta } from "../interfaces";
import { CodeMeta } from "../interfaces/CodeMeta";
import { LineAction } from "./LineAction";

export interface Snapshot {
  diagrams: DiagramMeta[];
  packages: PackageMeta[];
  classes: ClassMeta[];
  codes: CodeMeta[];
  relations: RelationMeta[];
  x6Nodes: X6NodeMeta[];
  x6Edges: X6EdgeMeta[];
  selectedElement?: string;
  selectedDiagram?: string;
}

export const themeModeState = atom<'light' | 'dark'>({
  key: "themeMode",
  default: 'dark',
})

export const metaIdState = atom<ID>({
  key: "uml.metaId",
  default: "",
})
export const editorOptionsState = atomFamily<UmlEditorOptions | undefined, string>({
  key: "uml.editorOptions",
  default: undefined,
});

export const minMapState = atomFamily<boolean, string>({
  key: "uml.minMap",
  default: true,
});

export const changedState = atomFamily<boolean, string>({
  key: "uml.changed",
  default: false,
});

export const diagramsState = atomFamily<DiagramMeta[], string>({
  key: "uml.diagrams",
  default: [],
});

export const packagesState = atomFamily<PackageMeta[], string>({
  key: "uml.packages",
  default: [],
})

export const classesState = atomFamily<ClassMeta[], string>({
  key: "uml.classes",
  default: [],
});


export const codesState = atomFamily<CodeMeta[], string>({
  key: "uml.codes",
  default: [],
});


export const relationsState = atomFamily<RelationMeta[], string>({
  key: "uml.relations",
  default: [],
});

export const x6NodesState = atomFamily<X6NodeMeta[], string>({
  key: "uml.x6Nodes",
  default: [],
});

export const x6EdgesState = atomFamily<X6EdgeMeta[], string>({
  key: "uml.x6Edges",
  default: [],
});

export const undoListState = atomFamily<Snapshot[], string>({
  key: "uml.undoList",
  default: [],
});

export const redoListState = atomFamily<Snapshot[], string>({
  key: "uml.redoList",
  default: [],
});

export const selectedElementState = atomFamily<string | undefined, string>({
  key: "uml.selectedElement",
  default: undefined,
});

export const selectedUmlDiagramState = atomFamily<string | undefined, string>({
  key: "uml.selectedDiagram",
  default: undefined,
});

export const drawingLineState = atomFamily<LineAction | undefined, string>({
  key: "uml.drawingLine",
  default: undefined,
});

export const pressedLineTypeState = atomFamily<
  RelationType | undefined,
  ID
>({
  key: "uml.pressedLineType",
  default: undefined,
});

export const prepareLinkToNodeState = atomFamily<string | undefined, string>({
  key: "uml.prepareLinkToNode",
  default: undefined,
});
