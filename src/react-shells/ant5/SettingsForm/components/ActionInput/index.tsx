import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Button, Divider, Modal, Space } from 'antd';
import "./style.less"
import { DATA_ACTIONS_LIST, ToolCollapse, UI_ACTIONS_LIST } from './ToolCollapse';
import { DeleteOutlined, RedoOutlined, UndoOutlined } from '@ant-design/icons';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { ActionsView } from './ActionsView';
import { IActionMeta } from 'runner/reaction/interfaces';
import { useToolsTranslate } from 'core-react/hooks/useToolsTranslate';
import { makeRxId } from 'core/utils/make-rxId';

export interface IActionsSnapshot {
  actions: IActionMeta[],
  selectedUuid?: string,
}

export const ActionInput = memo((props: {
  value?: IActionMeta[],
  onChange?: (actions: IActionMeta[]) => void
}) => {
  const { value, onChange } = props;
  const [actions, setActions] = useState<IActionMeta[]>([]);
  const [selectedUuid, setSelectedUuid] = useState<string>();
  const [undoList, setUndoList] = useState<IActionsSnapshot[]>([]);
  const [redoList, setRedoList] = useState<IActionsSnapshot[]>([]);

  const reset = useCallback(() => {
    setUndoList([]);
    setRedoList([]);
    setSelectedUuid(undefined);
    setActions(value || []);
  }, [value]);

  const backup = useCallback(() => {
    setRedoList([])
    setUndoList(list => [...list, { actions, selectedUuid }])
  },
    [actions, selectedUuid]
  )

  useEffect(() => {
    reset()
  }, [reset])

  const  t  = useToolsTranslate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const handleCancel = useCallback(() => {
    setIsModalVisible(false);
    reset();
  }, [reset]);

  const handleOk = useCallback(() => {
    onChange && onChange(actions);
    setIsModalVisible(false);
  }, [actions, onChange]);

  const insertAt = useCallback((action: IActionMeta, index: number) => {
    backup();
    const newActions = actions.filter(act => act.uuid !== action.uuid)
    newActions.splice(index, 0, action);
    setActions(newActions);
  }, [actions, backup])

  const remove = useCallback(() => {
    backup();
    setActions(actions => actions.filter(action => action.uuid !== selectedUuid))
    setSelectedUuid(undefined);
  }, [backup, selectedUuid])

  const handleDragEnd = useCallback(
    (result: DropResult) => {
      const { destination, source, draggableId } = result;
      if (destination?.droppableId) {
        var draggedNode: IActionMeta;
        if (source.droppableId === DATA_ACTIONS_LIST || source.droppableId === UI_ACTIONS_LIST) {
          draggedNode = {
            uuid: makeRxId(),
            type: draggableId as any,
            title: t("Action." + draggableId),
          };

          draggedNode.payload = {}
          // if (draggableId === ActionType.OpenPage) {
          //   draggedNode.payload = {
          //     openType: OpenPageType.RouteTo,
          //   }
          // }

        } else {
          //draggedNode = actions.find(action => action.uuid === draggableId);
        }

        // if (draggedNode) {
        //   insertAt(draggedNode, destination.index);
        //   setSelectedUuid(draggedNode.uuid);
        // }
      }
    },
    [t]
  )

  const handleSelect = useCallback((selectedId?: string) => {
    setSelectedUuid(selectedId)
  }, [])

  const selectedAction = useMemo(() => {
    return actions.find(action => action.uuid === selectedUuid)
  }, [actions, selectedUuid])

  const handleActionChange = useCallback((action: IActionMeta) => {
    backup();
    setActions(actions => actions.map(act => act.uuid === action.uuid ? action : act))
  }, [backup]);

  const handleUndo = useCallback(() => {
    const snapshot = undoList[undoList.length - 1];
    setRedoList(list => [...list, {
      actions,
      selectedUuid
    }]);

    setUndoList((list) => list.slice(0, list.length - 1));
    setActions(snapshot.actions);
    setSelectedUuid(snapshot.selectedUuid);
  }, [actions, selectedUuid, undoList]);

  const handleRedo = useCallback(() => {
    const snapshot = redoList[redoList.length - 1];
    setUndoList(list => [...list, {
      actions,
      selectedUuid
    }]);

    setRedoList((list) => list.slice(0, list.length - 1));
    setActions(snapshot.actions);
    setSelectedUuid(snapshot.selectedUuid);
  }, [actions, redoList, selectedUuid]);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Button
        block
        onClick={showModal}
      >
        {'SettingComponents.ActionInput.Title'}
      </Button>
      <Modal
        title={t('SettingComponents.ActionInput.Title"')}
        className="config-action-modal"
        width={900}
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={handleOk}
        okText={(t("confirm"))}
        cancelText={t("cancel")}
      >
        <div className='action-input-model-content'>
          <div className="toolbox block-area right-border">
            <div className='toolbar bottom-border'>{t("Action.Toolbox")}</div>
            <div style={{ overflow: "auto" }}>
              <ToolCollapse />
            </div>
          </div>
          <div className="main-area block-area right-border">
            <div className='toolbar bottom-border'>
              <Space>
                <Button
                  shape='circle'
                  type='text'
                  size='small'
                  disabled={undoList.length === 0}
                  icon={<UndoOutlined />}
                  onClick={handleUndo}
                />
                <Button
                  shape='circle'
                  type='text' size='small'
                  disabled={redoList.length === 0}
                  icon={<RedoOutlined />}
                  onClick={handleRedo}
                />
                <Divider type="vertical" />
                <Button
                  shape='circle'
                  type='text'
                  size='small'
                  disabled={!selectedUuid}
                  icon={<DeleteOutlined />}
                  onClick={remove}
                />
              </Space>
            </div>
            <div style={{
              flex: 1,
              display: "flex",
              flexFlow: "column",
              alignItems: "center",
              overflow: "auto"
            }}>
              <ActionsView
                actions={actions}
                selectedId={selectedUuid}
                onSelect={handleSelect}
              />
            </div>
          </div>
          <div className='property-box block-area'>
            <div className='toolbar bottom-border'>{t("Action.Properties")}</div>
            <div style={{ padding: 16, overflow: "auto" }}>
              Property
            </div>
          </div>
        </div>
      </Modal>
    </DragDropContext>
  )
}) 
