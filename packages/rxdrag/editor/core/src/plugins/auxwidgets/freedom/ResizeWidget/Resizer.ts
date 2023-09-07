import { IDesignerEngine, ITreeNode } from "../../../../interfaces";
import { AUX_BACKGROUND_COLOR, numbToPx } from "../../utils";
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
      const nodes = ids.map(id => this.engine.getMonitor().getNode(id)).filter(node => !!node) as ITreeNode[]

      const parentId = nodes[0]?.parentId
      if (parentId && containerRect && rect && nodes.length) {
        const htmlDiv = document.createElement('div')
        htmlDiv.style.backgroundColor = "transparent"
        htmlDiv.style.position = "fixed"
        htmlDiv.style.border = `solid 1px ${AUX_BACKGROUND_COLOR}`
        htmlDiv.style.pointerEvents = "none"
        htmlDiv.style.left = numbToPx(rect.x - containerRect.x)
        htmlDiv.style.top = numbToPx(rect.y - containerRect.y)
        htmlDiv.style.height = numbToPx(rect.height - 1)
        htmlDiv.style.width = numbToPx(rect.width - 1)
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