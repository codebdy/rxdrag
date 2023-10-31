import { IDesignerEngine, IRect, ITreeNode } from "../../../../interfaces";
import { AUX_BACKGROUND_COLOR, numbToPx } from "../../utils";
import { IElementInfo, INodeInfo } from "./CornerHandler";
import { LeftBottomConner } from "./LeftBottomConner";
import { LeftTopConner } from "./LeftTopConner";
import { RightBottomConner } from "./RightBottomConner";
import { RightTopConner } from "./RightTopConner";

export class Resizer {
  private htmlDiv?: HTMLElement;
  private leftTop?: LeftTopConner;
  private rightTop?: RightTopConner;
  private rightBottom?: RightBottomConner;
  private leftBottom?: LeftBottomConner;

  constructor(ids: string[], protected engine: IDesignerEngine) {
    const shell = engine.getShell()
    const canvas = shell.getCanvas(engine.getMonitor().getNodeDocumentId(ids[0]) || "")
    if (canvas) {
      const containerRect = canvas.getDocumentBodyRect()
      const rect = canvas.getNodesRect(ids);
      console.log("创建 Resizer")
      //判断根组件，多选不让选根组件，这里就无需判断
      const nodes: INodeInfo[] = ids.map(id => this.engine.getMonitor().getNode(id)).filter(node => !!node).map(nd => {
        const node = nd as ITreeNode
        return {
          node: node as ITreeNode,
          rect: canvas.getNodeRect((node as ITreeNode).id) as IRect,
          isGroup: false,
          elementInfos: canvas.getElements(node.id)?.map((ele => {
            return {
              element: ele,
              rect: ele.getBoundingClientRect()
            }
          })) as IElementInfo[]
        }
      })

      const parentId = nodes[0]?.node?.parentId
      if (parentId && containerRect && rect && nodes.length) {
        const htmlDiv = document.createElement('div')
        htmlDiv.style.boxSizing = "border-box"
        htmlDiv.style.backgroundColor = "transparent"
        htmlDiv.style.position = "fixed"
        htmlDiv.style.border = `solid 1px ${AUX_BACKGROUND_COLOR}`
        htmlDiv.style.pointerEvents = "none"
        htmlDiv.style.left = numbToPx(rect.x - containerRect.x)
        htmlDiv.style.top = numbToPx(rect.y - containerRect.y)
        htmlDiv.style.height = numbToPx(rect.height)
        htmlDiv.style.width = numbToPx(rect.width)
        htmlDiv.style.zIndex = "100000"
        canvas?.appendAux(htmlDiv)

        const inner = document.createElement('div')
        inner.style.height = "100%"
        inner.style.width = "100%"
        inner.style.position = "relative"
        htmlDiv.appendChild(inner)
        this.htmlDiv = htmlDiv

        this.leftTop = new LeftTopConner(nodes, rect, inner, engine)
        this.rightTop = new RightTopConner(nodes, rect, inner, engine)
        this.rightBottom = new RightBottomConner(nodes, rect, inner, engine)
        this.leftBottom = new LeftBottomConner(nodes, rect, inner, engine)
      }
    }
  }
  destory() {
    this.leftTop?.destory()
    this.rightTop?.destory()
    this.rightBottom?.destory()
    this.leftBottom?.destory()
    this.htmlDiv?.remove()
  }

}