import { memo, useEffect } from "react";
import { useExplorerScrollbarHide } from "./useExplorerScrollbarHide";
import { useEdgeLineDraw } from "./useEdgeLineDraw";
import { useEdgeChange } from "./useEdgeChange";
import { Graph } from "@antv/x6";
import { getGraphConfig } from "./getGraphConfig";
import { useNodesShow } from "./useNodesShow";
import { useNodeAdd } from "./useNodeAdd";
import { useNodeChange } from "./useNodeChange";
import { useNodeSelect } from "./useNodeSelect";
import { useEdgesShow } from "./useEdgesShow";
import { useEdgeSelect } from "./useEdgeSelect";
import { useTriggerSelectedEvent } from "./useTriggerSelectedEvent";
import { useEdgeHover } from "./useEdgeHover";
import { useTriggerPressedLineTypeEvent } from "./useTriggerPressedLineTypeEvent";
import { useMetaId } from "../hooks/useMetaId";
import { Selection } from '@antv/x6-plugin-selection'
import { MiniMap } from "@antv/x6-plugin-minimap";
import { Transform } from '@antv/x6-plugin-transform'
import { useClassAction } from "./useClassAction";
import { useToken } from "antd/es/theme/internal";

export const GraphCanvas = memo(
  (props: {
    graph?: Graph;
    onSetGraph: (graph?: Graph) => void,
  }) => {
    const { graph, onSetGraph } = props;
    const metaId = useMetaId();
    const [, token] = useToken();

    useEffect(() => {
      const config = getGraphConfig(token);
      const aGraph = new Graph(config);
      const container = document.getElementById("mini-map")
      if (container) {
        aGraph.use(
          new MiniMap({
            container: container,
            width: 140,
            height: 110
          })
        );
      }

      aGraph.use(new Selection({
        enabled: true,
        multiple: false,
        rubberband: false,
        movable: true,
        //showNodeSelectionBox: true,
      }))
      aGraph.use(
        new Transform({
          resizing: true,
          rotating: false,
        }),
      )
      onSetGraph(aGraph);
      return () => {
        aGraph?.dispose();
        onSetGraph(undefined);
      };
    }, [onSetGraph, token]);

    useExplorerScrollbarHide();
    useTriggerSelectedEvent(metaId);
    useTriggerPressedLineTypeEvent(metaId);
    useNodeSelect(graph, metaId);
    useEdgeSelect(graph, metaId);
    useNodesShow(graph, metaId);
    useEdgeLineDraw(graph, metaId);
    useEdgesShow(graph, metaId);
    useNodeChange(graph, metaId);
    useEdgeChange(graph, metaId);
    useNodeAdd(graph, metaId);
    useEdgeHover(graph, metaId);
    useClassAction(graph, metaId);

    return (
      <div
        id="container"
        style={{
          flex: 1,
          overflow: "auto",
          position: "relative",
        }}
      ></div>
    );
  }
);
