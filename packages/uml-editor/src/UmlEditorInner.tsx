import React, { memo, useEffect, useState } from "react";
import { EntityTree } from "./EntityTree";
import { Graph } from "@antv/x6";
import "@antv/x6-react-shape";
import { metaIdState, minMapState, selectedUmlDiagramState } from "./recoil/atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Toolbox } from "./Toolbox";
import { UmlToolbar } from "./UmlToolbar";
import { GraphCanvas } from "./GraphCanvas";
import { PropertyPanel } from "./PropertyPanel";
import styled from "styled-components";
import { useParesMeta } from "./hooks/useParesMeta";
import { MetaContent } from "./interfaces";
import { ModelBoard } from "./ModelBoard";
import { GlobalToken } from "antd";
import { ILocales } from "@rxdrag/locales";

const MapContianer = styled.div`
  position: absolute;
  z-index: 1;
  bottom: 3px;
  left: 3px;
  width: 140px;
  height: 110px;
  border-radius: 5px;
  overflow: hidden;
  .x6-widget-minimap{
    background-color: ${props => props.theme.token?.colorBgBase};
  }
  .x6-graph{
    box-shadow: none;
  }
`


export type UmlEditorProps = {
  actions?: React.ReactNode,
  metaContent: MetaContent | undefined,
  metaId: string | undefined,
  themeMode?: "dark" | "light",
  lang?: string,
  token?: GlobalToken,
  locales?: ILocales
}

export const UmlEditorInner = memo((
  props: UmlEditorProps
) => {
  const { actions, metaContent, metaId = "" } = props;
  const [graph, setGraph] = useState<Graph>();
  const setMetaId = useSetRecoilState(metaIdState)

  useParesMeta(metaContent, metaId);
  const minMap = useRecoilValue(minMapState(metaId));
  const selectedDiagram = useRecoilValue(selectedUmlDiagramState(metaId));

  useEffect(() => {
    setMetaId(metaId)
  }, [metaId, setMetaId])

  return (
    <ModelBoard
      listWidth={260}
      modelList={<EntityTree graph={graph}></EntityTree>}
      toolbox={selectedDiagram && <Toolbox graph={graph}></Toolbox>}
      toolbar={<UmlToolbar actions={actions} />}
      propertyBox={<PropertyPanel />}
    >
      {
        selectedDiagram &&
        <div
          style={{
            display: "flex",
            flex: 1,
            flexFlow: "column",
            overflow: "auto"
          }}>
          <GraphCanvas
            graph={graph}
            onSetGraph={setGraph}
          ></GraphCanvas>
          <MapContianer
            className="model-minimap"
            style={{
              display: minMap ? "block" : "none"
            }}
            id="mini-map"
          ></MapContianer>
        </div>
      }
    </ModelBoard>
  );
});

UmlEditorInner.displayName = "UmlEditorInner";