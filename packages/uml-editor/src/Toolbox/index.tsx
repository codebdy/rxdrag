import React, { memo, useCallback } from "react";
import { Graph } from "@antv/x6";
import {
  svgInherit,
  svgOneWayAssociation,
  svgTwoWayAggregation,
  svgTwoWayAssociation,
  svgTwoWayCombination,
} from "./constSvg";
import { pressedLineTypeState, selectedElementState } from "../recoil/atoms";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useCreateTempClassNodeForNew } from "../hooks/useCreateTempClassNodeForNew";
import { ClassRect } from "./ClassRect";
import { Collapse } from "antd";
import { useMetaId } from "../hooks/useMetaId";
import { useDnd } from "../GraphCanvas/useDnd";
import styled from "styled-components";
import { StereoType, RelationType } from "@rxdrag/uml-schema";
import { PRIMARY_COLOR } from "../consts";
import { useTranslate } from "@rxdrag/react-locales";

const Container = styled.div`
  display: flex;
  flex-flow: column;
  border-right: solid 1px ${props => props.theme.token?.colorBorderSecondary};
  width: 100px;
  align-items: center;
  overflow-y: auto;
  overflow-x: hidden;

  //background-color: @backgrounColor;
  .ant-collapse {
    border: 0;
    //border-radius: 0;
    width: 100px;

    .ant-collapse-item {
      border-radius: 0px !important;

      .ant-collapse-header {
        border-radius: 0px !important;
      }
      .ant-collapse-content{
        border-radius: 0px !important;
      }
    }
  }
`

export const ToolItem = memo(
  (props: {
    selected?: boolean;
    children: React.ReactNode;
    onMouseDown?: React.MouseEventHandler<HTMLDivElement>;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
  }) => {
    const { children, onMouseDown, onClick, selected } = props;
    return (
      <div
        style={{
          display: "flex",
          flexFlow: "column",
          alignItems: "center",
          marginBottom: "16px",
          fontSize: "13px",
          color: selected ? PRIMARY_COLOR : undefined,
          cursor: onClick ? "pointer" : "move",
        }}
        data-type="rect"
        onMouseDown={onMouseDown}
        onClick={onClick}
      >
        {children}
      </div>
    );
  }
);

export const Toolbox = memo((props: { graph?: Graph }) => {
  const { graph } = props;
  const dnd = useDnd(graph)
  const t = useTranslate();
  const metaId = useMetaId();
  const setSelemedElement = useSetRecoilState(selectedElementState(metaId))
  const [pressedLineType, setPressedLineType] = useRecoilState(
    pressedLineTypeState(metaId)
  );
  const createTempClassNodeForNew = useCreateTempClassNodeForNew(metaId);

  const startDragFn = (stereoType: StereoType) => {
    return (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!graph) {
        return;
      }
      setSelemedElement(undefined);
      const nodeConfig = createTempClassNodeForNew(stereoType) as any;
      //nodeConfig.component = <ClassView />;
      const node = graph.createNode(nodeConfig);
      dnd?.start(node, e.nativeEvent as any);
    };
  };

  const doRelationClick = useCallback(
    (lineType: RelationType) => {
      if (lineType === pressedLineType) {
        setPressedLineType(undefined);
      } else {
        setPressedLineType(lineType);
      }
    },
    [pressedLineType, setPressedLineType]
  );

  const handleRelationClick = useCallback(
    (lineType: RelationType) => {
      return () => doRelationClick(lineType);
    },
    [doRelationClick]
  );

  return (
    <Container>
      <Collapse
        accordion
        defaultActiveKey={["1"]}

        items={[
          {
            key: "1",
            label: t("Class"),
            children: <>
              <ToolItem onMouseDown={startDragFn(StereoType.Entity)}>
                <ClassRect oneBorder={false} />
                {t("EntityClass")}
              </ToolItem>
              <ToolItem onMouseDown={startDragFn(StereoType.Abstract)}>
                <ClassRect stereoChar="A" oneBorder={false} />
                {t("AbstractClass")}
              </ToolItem>
              <ToolItem onMouseDown={startDragFn(StereoType.Enum)}>
                <ClassRect stereoChar="E" oneBorder={true} />
                {t("EnumClass")}
              </ToolItem>
              <ToolItem onMouseDown={startDragFn(StereoType.ValueObject)}>
                <ClassRect stereoChar="V" oneBorder={true} />
                {t("ValueClass")}
              </ToolItem>
              <ToolItem
                selected={pressedLineType === RelationType.INHERIT}
                onClick={handleRelationClick(RelationType.INHERIT)}
              >
                {svgInherit}
                {t("Inherit")}
              </ToolItem>
            </>
          },
          {
            key: "2",
            label: t("Relationships"),
            children: <>
              <ToolItem
                selected={pressedLineType === RelationType.TWO_WAY_ASSOCIATION}
                onClick={handleRelationClick(RelationType.TWO_WAY_ASSOCIATION)}
              >
                {svgTwoWayAssociation}
                {t("Association")}
              </ToolItem>
              <ToolItem
                selected={pressedLineType === RelationType.TWO_WAY_AGGREGATION}
                onClick={handleRelationClick(RelationType.TWO_WAY_AGGREGATION)}
              >
                {svgTwoWayAggregation}
                {t("Aggregation")}
              </ToolItem>
              <ToolItem
                selected={pressedLineType === RelationType.TWO_WAY_COMBINATION}
                onClick={handleRelationClick(RelationType.TWO_WAY_COMBINATION)}
              >
                {svgTwoWayCombination}
                {t("Combination")}
              </ToolItem>
              <ToolItem
                selected={pressedLineType === RelationType.ONE_WAY_ASSOCIATION}
                onClick={handleRelationClick(RelationType.ONE_WAY_ASSOCIATION)}
              >
                {svgOneWayAssociation}
                {t("OneWanAssociation")}
              </ToolItem>
            </>
          }
        ]}
      >
      </Collapse>
      {/* <CategoryCollapse title={intl.get("one-way-relation")}>
        <ToolItem
          selected={pressedLineType === RelationType.ONE_WAY_ASSOCIATION}
          onClick={handleRelationClick(RelationType.ONE_WAY_ASSOCIATION)}
        >
          {svgOneWayAssociation}
          {intl.get("association")}
        </ToolItem>
        <ToolItem
          selected={pressedLineType === RelationType.ONE_WAY_AGGREGATION}
          onClick={handleRelationClick(RelationType.ONE_WAY_AGGREGATION)}
        >
          {svgOneWayAggregation}
          {intl.get("aggregation")}
        </ToolItem>
        <ToolItem
          selected={pressedLineType === RelationType.ONE_WAY_COMBINATION}
          onClick={handleRelationClick(RelationType.ONE_WAY_COMBINATION)}
        >
          {svgOneWayCombination}
          {intl.get("combination")}
        </ToolItem>
      </CategoryCollapse>
      <CategoryCollapse title={intl.get("others")} disabled>
        <ToolItem
        // onMouseDown={startDragFn(StereoType.Association)}
        >
          <ClassRect stereoChar="R" oneBorder = {true} />
          {intl.get("association-class")}
        </ToolItem>
        <ToolItem
          selected={pressedLineType === RelationType.LINK_LINE}
          //onClick={handleRelationClick(RelationType.LINK_LINE)}
        >
          {svgLinkLine}
          {intl.get("link-line")}
        </ToolItem>
      </CategoryCollapse> */}
    </Container>
  );
});
