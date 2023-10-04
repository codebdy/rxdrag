import { Graph, Path } from "@antv/x6";
import { register } from "@antv/x6-react-shape";
import { Options } from "@antv/x6/lib/graph/options";
import { ReactionNode } from "../components/ReactionNode";

export const config: Partial<Options.Manual> = {
  //是否监听容器大小改变，并自动更新画布大小。
  autoResize: true,
  panning: {
    enabled: true,
    eventTypes: ['leftMouseDown', 'mouseWheel'],
  },
  mousewheel: {
    enabled: true,
    modifiers: 'ctrl',
    factor: 1.1,
    maxScale: 1.5,
    minScale: 0.5,
  },
}


register({
  shape: 'reaction-node',
  width: 180,
  height: 36,
  component: ReactionNode,
})

Graph.registerNode(
  'group-node',
  {
    inherit: 'rect',
    width: 80,
    height: 40,
    attrs: {
      body: {
        stroke: '#8f8f8f',
        strokeWidth: 2,
        fill: 'transparent',
        rx: 6,
        ry: 6,
      },
    },
  },
  true,
)

Graph.registerEdge(
  'reaction-edge',
  {
    inherit: 'edge',
    attrs: {
      line: {
        stroke: "#5e76c3",
        strokeWidth: 1,
        targetMarker: null,
      },
    },
  },
  true,
)

Graph.registerConnector(
  'reactions-connector',
  (s, e) => {
    const offset = 8
    const deltaX = Math.abs(e.x - s.x)
    const control = Math.floor((deltaX / 3) * 2)

    const v1 = { x: s.x + offset + control, y: s.y }
    const v2 = { x: e.x - offset - control, y: e.y }

    return Path.normalize(
      `M ${s.x} ${s.y}
       L ${s.x + offset} ${s.y}
       C ${v1.x} ${v1.y} ${v2.x} ${v2.y} ${e.x - offset} ${e.y}
       L ${e.x} ${e.y}
      `,
    )
  },
  true,
)