import { Graph } from "@antv/x6"
import React, { useCallback } from "react"
import { memo } from "react"
import { NODE_INIT_SIZE } from "../GraphCanvas/nodeInitSize";
import { useRecoilValue } from 'recoil';
import { selectedElementState, themeModeState } from './../recoil/atoms';
import { Button } from "antd"
import { DeleteOutlined } from "@ant-design/icons"
import { useDeleteClass } from "../hooks/useDeleteClass"
import { useDnd } from "../GraphCanvas/useDnd"
import { useMetaId } from "../hooks/useMetaId"
import { useToken } from "antd/es/theme/internal"
import { ClassMeta } from "@rxdrag/uml-schema";
import TreeNodeLabel from "./TreeNodeLabel";
import { PRIMARY_COLOR } from "../consts";


const ClassLabel = memo((
  props: {
    cls: ClassMeta,
    graph?: Graph
  }
) => {
  const { cls, graph } = props;
  const dnd = useDnd(graph)
  const metaId = useMetaId();
  //const classes = useRecoilValue(classesState(metaId));
  const selectedElement = useRecoilValue(selectedElementState(metaId));
  const deleteClass = useDeleteClass(metaId);
  const themeMode = useRecoilValue(themeModeState);
  const [, token] = useToken();

  // useEffect(() => {
  //   const theDnd = graph
  //     ? new Dnd({
  //       target: graph,
  //       scaled: false,
  //       animation: true,
  //     })
  //     : undefined;
  //   setDnd(theDnd);
  // }, [graph, classes]);

  const startDragHandle = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>, cls: ClassMeta) => {
      if (!graph) {
        return;
      }
      const node = graph.createNode({
        ...NODE_INIT_SIZE,
        height: 70 + (cls?.attributes.length || 0) * 26,
        isTempForDrag: true,
        shape: "class-node",

        data: {
          ...cls, 
          isTempForDrag: true, 
          themeMode,
          backgroundColor: token.colorBgBase,
          textColor: token.colorText,
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      dnd?.start(node, e.nativeEvent as any);
    },
    [dnd, graph, themeMode, token.colorBgBase, token.colorText]
  );

  const handleDelete = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
    deleteClass(cls.uuid);
  }, [cls.uuid, deleteClass]);

  return (
    <TreeNodeLabel
      action={
        <Button
          type="text"
          shape='circle'
          size='small'
          onClick={handleDelete}
        >
          <DeleteOutlined />
        </Button>
      }
    >
      <div style={{ color: selectedElement === cls.uuid ? PRIMARY_COLOR : undefined }}
        draggable
        onDragStart={e => startDragHandle(e, cls)}
      >
        {cls.name}
      </div>
    </TreeNodeLabel>
  )
})

export default ClassLabel