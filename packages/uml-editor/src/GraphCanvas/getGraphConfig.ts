import { Options } from "@antv/x6/lib/graph/options";
import { getGraphSize } from "./getGraphSize";
import { register } from "@antv/x6-react-shape";
import { NODE_INIT_SIZE } from "./nodeInitSize";
import { ClassView } from "./ClassView";
import { CellView } from "@antv/x6";
import { GlobalToken } from "antd/es/theme/interface";

register({
  shape: 'class-node',
  ...NODE_INIT_SIZE,
  component: ClassView,
})


export const getGraphConfig = (token: GlobalToken): Partial<Options.Manual> => {
  const containerDiv = document.getElementById('container') || undefined;
  containerDiv?.getBoundingClientRect()
  const graphSize = getGraphSize();
  return {
    container: containerDiv,
    interacting: (cellView: CellView) => {
      return { nodeMovable: true, edgeLabelMovable: false };
    },
    autoResize: true,
    width: graphSize.width,
    height: graphSize.height,
    grid: {
      size: 10,      // 网格大小 10px
      visible: true, // 渲染网格背景
      type: 'doubleMesh',
      args: [
        {
          color: token?.colorBorder, // 主网格线颜色
          thickness: 1,     // 主网格线宽度
        },
        {
          color: token?.colorBorderSecondary, // 次网格线颜色
          thickness: 1,     // 次网格线宽度
          factor: 4,        // 主次网格线间隔
        },
      ],
    },
    panning: {
      enabled: true,
      eventTypes: ['leftMouseDown', 'mouseWheel'],
    },
    mousewheel: {
      enabled: true,
      modifiers: ['ctrl', 'meta'],
    },
  }
}