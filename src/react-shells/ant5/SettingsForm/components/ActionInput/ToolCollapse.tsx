import { Collapse } from 'antd';
import { useToolsTranslate } from 'core-react/hooks/useToolsTranslate';
import { memo, useMemo } from 'react';

import { Draggable, Droppable } from 'react-beautiful-dnd';
import DraggableLabel from './DraggableLabel';
const { Panel } = Collapse;

export const DATA_ACTIONS_LIST = "DATA_ACTIONS_LIST";
export const UI_ACTIONS_LIST = "UI_ACTIONS_LIST";

const enumToLangKey = (actionType: string) => {
  return "Action." + actionType;
}

export const ToolCollapse = memo(() => {
  const  t  = useToolsTranslate();
  const dataItems:any[] = useMemo(() => [
    // {
    //   id: ActionType.SaveData,
    //   title: t(enumToLangKey(ActionType.SaveData)),
    // },
    // {
    //   id: ActionType.DeleteData,
    //   title: t(enumToLangKey(ActionType.DeleteData)),
    // },
    // {
    //   id: ActionType.BatchUpdate,
    //   title: t(enumToLangKey(ActionType.BatchUpdate)),
    // },
    // {
    //   id: ActionType.BatchDelete,
    //   title: t(enumToLangKey(ActionType.BatchDelete)),
    // },
    // {
    //   id: ActionType.Reset,
    //   title: t(enumToLangKey(ActionType.Reset)),
    // },
    // {
    //   id: ActionType.SubmitSearch,
    //   title: t(enumToLangKey(ActionType.SubmitSearch)),
    // },
    // {
    //   id: ActionType.OpenFile,
    //   title: t(enumToLangKey(ActionType.OpenFile)),
    // },
    // {
    //   id: ActionType.Graphql,
    //   title: t(enumToLangKey(ActionType.Graphql)),
    // },
    // {
    //   id: ActionType.Customized,
    //   title: t(enumToLangKey(ActionType.Customized)),
    // },
  ], []);

  const uiItems:any[] = useMemo(() => [
    // {
    //   id: ActionType.OpenPage,
    //   title: t(enumToLangKey(ActionType.OpenPage)),
    // },
    // {
    //   id: ActionType.ClosePage,
    //   title: t(enumToLangKey(ActionType.ClosePage)),
    // },
    // {
    //   id: ActionType.OpenDialog,
    //   title: t(enumToLangKey(ActionType.OpenDialog)),
    // },
    // {
    //   id: ActionType.CloseDialog,
    //   title: t(enumToLangKey(ActionType.CloseDialog)),
    // },
    // {
    //   id: ActionType.OpenDrawer,
    //   title: t(enumToLangKey(ActionType.OpenDrawer)),
    // },
    // {
    //   id: ActionType.CloseDrawer,
    //   title: t(enumToLangKey(ActionType.CloseDrawer)),
    // },
    // {
    //   id: ActionType.Confirm,
    //   title: t(enumToLangKey(ActionType.Confirm)),
    // },
    // {
    //   id: ActionType.SuccessMessage,
    //   title: t(enumToLangKey(ActionType.SuccessMessage)),
    // },
    // {
    //   id: ActionType.Navigate,
    //   title: t(enumToLangKey(ActionType.Navigate)),
    // },
    // {
    //   id: ActionType.WindowOpen,
    //   title: t(enumToLangKey(ActionType.WindowOpen)),
    // },
  ], []);


  return (
    <Collapse
      defaultActiveKey={['1']}
      ghost
      accordion
      bordered={false}
    >
      <Panel header={t("Action.DataActions")} key="1">
        <Droppable droppableId={DATA_ACTIONS_LIST} isDropDisabled={true}>
          {(provided) => (
            <div ref={provided.innerRef}>
              {dataItems.map((item, index) => {
                return (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <>
                        <DraggableLabel
                          title={item.title}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          float={snapshot.isDragging}
                          ref={provided.innerRef}
                        />
                        {snapshot.isDragging && (
                          <DraggableLabel
                            title={item.title}
                            fixed
                          />
                        )}
                      </>
                    )}
                  </Draggable>
                );
              })}
              <div style={{ display: "none" }}>{provided.placeholder}</div>
            </div>
          )}

        </Droppable>
      </Panel>
      <Panel header={t("Action.UiActions")} key="2">
        <Droppable droppableId={UI_ACTIONS_LIST} isDropDisabled={true}>
          {(provided) => (
            <div ref={provided.innerRef}>
              {uiItems.map((item, index) => {
                return (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <>
                        <DraggableLabel
                          title={item.title}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          float={snapshot.isDragging}
                          ref={provided.innerRef}
                        />
                        {snapshot.isDragging && (
                          <DraggableLabel
                            title={item.title}
                            fixed
                          />
                        )}
                      </>
                    )}
                  </Draggable>
                );
              })}
              <div style={{ display: "none" }}>{provided.placeholder}</div>
            </div>
          )}

        </Droppable>
      </Panel>
    </Collapse>
  );
});
