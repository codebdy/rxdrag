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
import { CONST_ID } from "../meta/Meta";
import { Button, Divider, Space } from "antd";
import { DeleteOutlined, RedoOutlined, UndoOutlined } from "@ant-design/icons";
import { ModelToolbar } from "common/ModelBoard/ModelToolbar";
import { useMetaId } from "../hooks/useMetaId";
import styled from "styled-components";
import { useSelectedGraphLogic } from "UmlEditor/hooks/useSelectedGraphLogic";
import { mapIcon } from "./icons";
import { useRemoveSelected, useSelected } from "@rxdrag/minions-logicflow-editor";
import { LogicFlowProperty } from "./LogicFlowProperty";

export const ToolbarButton = styled((props) => <Button type="text" {...props} />)`
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
  const selectedLogicflow = useSelectedGraphLogic();

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

  const { selected } = useSelected()
  const handleRemove = useRemoveSelected()

  return (
    <ModelToolbar>
      <Space>
        {
          !selectedLogicflow &&
          <ToolbarButton
            disabled={!selectedDiagram}
            onClick={toggleMinMap}

            type={minMap ? "default" : "text"}
            icon={mapIcon}
          >
          </ToolbarButton>
        }

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
        {
          !selectedLogicflow ?
            <ToolbarButton
              disabled={
                (attribute && attribute.name === CONST_ID) || !selectedElement
              }
              icon={<DeleteOutlined />}
              onClick={handleDelete}
            ></ToolbarButton>
            :
            <ToolbarButton
              disabled={
                !selected
              }
              icon={<DeleteOutlined />}
              onClick={handleRemove}
            ></ToolbarButton>
        }
      </Space>
      <div style={{ flex: 1 }} />
      <Space
        style={{ marginRight: 16 }}
      >
        {
          selectedLogicflow &&
          <LogicFlowProperty />
        }
      </Space>
      {actions}
    </ModelToolbar>
  );
});
