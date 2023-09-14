import { memo, useMemo } from "react";
import { DEFAULT_MARGIN } from "../../utilities";
import styled from 'styled-components';
import { ColumnTitle, FlatableColumn } from "../FlatableColumn";
import { MenuItemType } from "../../interfaces";
import { ResourceItem } from "./ResourceItem";
import { Collapse } from 'antd';
import type { CollapseProps } from 'antd';
import { Draggable, Droppable } from "react-beautiful-dnd";
import { DraggableLabel } from "./DraggableLabel";

const maxWidth = 1000
const minWidth = 200

const StyledCollapse = styled(Collapse)`
  border-radius: 0;
  border: 0;
  .ant-collapse-content-box{
    padding: 0 16px !important;
    margin: 0;
  }
  .ant-collapse-item{
    border-radius: 0 !important;
  }
  .ant-collapse-content{
    background-color: transparent;
  }
`

const ToolboxShell = styled(FlatableColumn)`
  left: ${DEFAULT_MARGIN}px;
`
export const Toolbox = memo(() => {
  const items2 = useMemo(() => [
    {
      id: 'COLLAPSE_GROUP_ID',
      title: '组',
    },
    {
      id: 'DIVIDER_ID',
      title: '分隔符',
    },
    {
      id: 'CUSTOMIZED_LINK_ID',
      title: '链接',
    },
  ], []);

  const items: CollapseProps['items'] = useMemo(() => [
    {
      key: '1',
      label: '基础',
      children: <Droppable
        droppableId={'HELPER_LIST_ID'}
        isDropDisabled={true}
      >
        {(provided) => (
          <div ref={provided.innerRef}>
            {items2.map((item, index) => {
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
    },
    {
      key: '2',
      label: '功能',
      children: <>
        <ResourceItem name={MenuItemType.text} />
        <ResourceItem name={MenuItemType.link} />
      </>,
    },
  ], []);

  return (
    <ToolboxShell
      maxWidth={maxWidth}
      minWidth={minWidth}
      width={320}
    >
      <ColumnTitle>
        菜单源
      </ColumnTitle>
      <StyledCollapse size="small" accordion items={items} ghost />
    </ToolboxShell>
  )
})

