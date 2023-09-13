import { memo } from "react";
import { DEFAULT_MARGIN } from "../../utilities";
import styled from 'styled-components';
import { ColumnTitle, FlatableColumn } from "../FlatableColumn";
import { useDraggable } from "@dnd-kit/core";

const maxWidth = 1000
const minWidth = 200

const ToolboxShell = styled(FlatableColumn)`
  left: ${DEFAULT_MARGIN}px;
`

export const Toolbox = memo(() => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: 'draggable',
    data: {
      xxx: "xx"
    }
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <ToolboxShell
      maxWidth={maxWidth}
      minWidth={minWidth}
      width={320}
    >
      <ColumnTitle>
        菜单源
      </ColumnTitle>
      <button>
        拖动测试
      </button>
      <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
        拖动测试
      </button>
    </ToolboxShell>
  )
})

