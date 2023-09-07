import { IDesignerEngine, IShellPane } from "../../../../interfaces";
import { getMaxZIndex } from "../../common/ActiviedOutline/getMaxZIndex";
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
  
  constructor(id: string, canvas: IShellPane, elements: HTMLElement[] | null, protected engine: IDesignerEngine) {
    const containerRect = canvas.getDocumentBodyRect()
    const rect = canvas.getNodeRect(id);
    //判断根组件
    const parentId = this.engine.getMonitor().getNode(id)?.parentId
    if (parentId && containerRect && rect && elements?.length) {
      const htmlDiv = document.createElement('div')
      htmlDiv.style.backgroundColor = "transparent"
      htmlDiv.style.position = "fixed"
      htmlDiv.style.border = `solid 1px ${AUX_BACKGROUND_COLOR}`
      htmlDiv.style.pointerEvents = "none"
      htmlDiv.style.left = numbToPx(rect.x - containerRect.x)
      htmlDiv.style.top = numbToPx(rect.y - containerRect.y)
      htmlDiv.style.height = numbToPx(rect.height - 1)
      htmlDiv.style.width = numbToPx(rect.width - 1)
      htmlDiv.style.zIndex = (getMaxZIndex(elements?.[elements.length - 1]) + 1).toString()
      canvas?.appendAux(htmlDiv)

      const inner = document.createElement('div')
      inner.style.height = "100%"
      inner.style.width = "100%"
      inner.style.position = "relative"
      htmlDiv.appendChild(inner)
      this.htmlDiv = htmlDiv

      this.leftTop = new LeftTopConner(inner, engine)
      this.rightTop = new RightTopConner(inner, engine)
      this.rightBottom = new RightBottomConner(inner, engine)
      this.leftBottom = new LeftBottomConner(inner, engine)
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