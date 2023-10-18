import React, { memo, useCallback } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  minMapState,
  redoListState,
  selectedUmlDiagramState,
  selectedElementState,
  undoListState,
} from "../recoil/atoms";
import { useUndo } from "../hooks/useUndo";
import { useRedo } from "../hooks/useRedo";
import { useAttribute } from "../hooks/useAttribute";
import { useDeleteSelectedElement } from "../hooks/useDeleteSelectedElement";
import { Button, Divider, Space } from "antd";
import { DeleteOutlined, RedoOutlined, UndoOutlined } from "@ant-design/icons";
import { useMetaId } from "../hooks/useMetaId";
import styled from "styled-components";
import { mapIcon } from "./icons";
import { CONST_ID } from "@rxdrag/uml-schema";
import { ModelToolbar } from "../ModelBoard/ModelToolbar";

export const ToolbarButton = styled((props) => <Button type="text" size="small" {...props} />)`
`

export const UmlToolbar = memo((
  props: {
    actions?: React.ReactNode
  }
) => {
  const { actions } = props;
  const metaId = useMetaId();
  const undoList = useRecoilValue(undoListState(metaId));
  const redoList = useRecoilValue(redoListState(metaId));
  const selectedDiagram = useRecoilValue(selectedUmlDiagramState(metaId));
  const selectedElement = useRecoilValue(selectedElementState(metaId));

  const { attribute } = useAttribute(selectedElement || "", metaId);
  const undo = useUndo(metaId);
  const redo = useRedo(metaId);
  const deleteSelectedElement = useDeleteSelectedElement(metaId);
  const [minMap, setMinMap] = useRecoilState(minMapState(metaId));

  const toggleMinMap = useCallback(() => {
    setMinMap((a) => !a);
  }, [setMinMap]);

  const handleUndo = useCallback(() => {
    undo();
  }, [undo]);

  const handleRedo = () => {
    redo();
  };

  const handleDelete = useCallback(() => {
    deleteSelectedElement();
  }, [deleteSelectedElement]);

  return (
    <ModelToolbar>
      <Space>
        <ToolbarButton
          disabled={!selectedDiagram}
          onClick={toggleMinMap}

          type={minMap ? "default" : "text"}
          icon={mapIcon}
        >
        </ToolbarButton>

        <Divider />
        <ToolbarButton
          icon={<UndoOutlined />}
          disabled={undoList.length === 0}
          onClick={handleUndo}
        >
        </ToolbarButton>
        <ToolbarButton
          icon={<RedoOutlined />}
          disabled={redoList.length === 0}
          onClick={handleRedo}
        >
        </ToolbarButton>
        <Divider type="vertical" />

        <ToolbarButton
          disabled={
            (attribute && attribute.name === CONST_ID) || !selectedElement
          }
          icon={<DeleteOutlined />}
          onClick={handleDelete}
        ></ToolbarButton>

      </Space>
      <div style={{ flex: 1 }} />
      {actions}
    </ModelToolbar>
  );
});
