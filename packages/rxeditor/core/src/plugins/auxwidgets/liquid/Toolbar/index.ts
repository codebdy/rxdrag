import { CloneButton } from "./controls/CloneButton";
import { DeleteButton } from "./controls/DeleteButton";
import { ComponentSelector } from "./controls/Selector";
import { IAuxControl, IAuxToolbar } from "./interfaces";
import { MoveButton } from "./controls/MoveButton";
import { LockButton } from "./controls/LockButton";
import { ID, IDesignerEngine, IPlugin, ITreeNode, Unsubscribe } from "../../../../interfaces";
import { DraggingNodesState } from "../../../../reducers/draggingNodes";
import { DraggingResourceState } from "../../../../reducers/draggingResource";
import { CanvasScrollEvent } from "../../../../shell";
import { getMaxZIndex } from "../../common/ActiviedOutline/getMaxZIndex";
import { numbToPx } from "../../utils";

//工具栏
export class ToolbarImpl implements IPlugin, IAuxToolbar {
  name = "default.toolbar";
  resizeObserver: ResizeObserver
  private unsubscribe: Unsubscribe;
  private unsubscribeSelect: Unsubscribe;
  private nodeChangeUnsubscribe: Unsubscribe;
  private controls: IAuxControl[] = [];
  private htmlElement: HTMLElement | null = null
  private unCanvasScroll: Unsubscribe
  private draggingNodesOff: Unsubscribe
  private draggingResourceOff: Unsubscribe
  private refreshedFlag = false
  constructor(protected engine: IDesignerEngine,) {
    if (!engine.getShell().getContainer) {
      console.error("Html 5 driver rootElement is undefined")
    }
    this.resizeObserver = new ResizeObserver(this.onResize)

    this.addControl(new ComponentSelector(engine))
    this.addControl(new LockButton(engine))
    this.addControl(new CloneButton(engine))
    this.addControl(new MoveButton(engine))
    this.addControl(new DeleteButton(engine))
    this.unsubscribe = engine.getMonitor().subscribeToCurrentNodeChanged(this.currentNodeChanged)
    this.unsubscribeSelect = engine.getMonitor().subscribeToSelectChange(this.handleSelectChange)
    this.nodeChangeUnsubscribe = engine.getMonitor().subscribeToHasNodeChanged(this.refresh)
    this.unCanvasScroll = this.engine.getShell().subscribeTo<CanvasScrollEvent>(CanvasScrollEvent.Name, this.refresh)
    this.draggingNodesOff = this.engine.getMonitor().subscribeToDraggingNodes(this.handleDraggingNodes)
    this.draggingResourceOff = this.engine.getMonitor().subscribeToDraggingResource(this.handleDraggingResource)
  }

  onResize = () => {
    this.refresh()
  }

  //临时措施，跟踪popup变化
  handleSelectChange = (selectedIds: ID[] | null) => {
    this.refresh()
    if (selectedIds?.length && !this.engine.getShell().getElements(selectedIds?.[0])) {
      setTimeout(() => {
        this.refresh()
      }, 100)
    }
  }

  currentNodeChanged = (node: ITreeNode) => {
    this.resizeObserver.disconnect()
    this.refresh()
    if (node && !this.engine.getShell().getElements(node.id)) {
      setTimeout(() => {
        this.refresh()
      }, 100)
    }
  }

  handleDraggingNodes = (dragging: DraggingNodesState | null) => {
    this.hideWhenDragging(!!dragging)
  }

  handleDraggingResource = (dragging: DraggingResourceState | null) => {
    this.hideWhenDragging(!!dragging)
  }

  private hideWhenDragging = (dragging: boolean) => {
    if (dragging) {
      if (this.htmlElement) {
        this.htmlElement.style.display = "none"
      }
    } else {
      if (this.htmlElement) {
        this.htmlElement.style.display = "flex"
      }
    }
  }

  replaceControl(control: IAuxControl): void {
    if (this.controls.find(ctrl => ctrl.name === control.name)) {
      this.controls = this.controls.map(ctrl => ctrl.name === control.name ? control : ctrl)
    } else {
      throw new Error("Can not find old control by name:" + control.name)
    }
  }

  addControl(control: IAuxControl, index?: number | undefined): void {
    if (index !== undefined && index >= this.controls.length) {
      throw new Error("index is too big")
    }
    if (index === undefined) {
      this.controls.push(control)
    } else {
      this.controls.splice(index, 0, control)
    }
  }

  private render() {
    const node = this.engine.getMonitor().getCurrentNode()
    const divEl = this.htmlElement
    const shell = this.engine.getShell()
    const canvas = shell.getCanvas(this.engine.getMonitor().getNodeDocumentId(node?.id || "") || "")
    divEl && divEl.remove()
    this.htmlElement = null
    if (!node) {
      if (divEl) {
        divEl.remove()
      }
      return
    }

    const elements = node.id && shell.getElements(node.id)
    const positionLimit = this.positionLimit(node.documentId)

    const containerRect = canvas?.getDocumentBodyRect()
    const rect = shell.getNodeRect(node.id);
    if (elements && positionLimit && containerRect && rect) {
      const htmlDiv = document.createElement('div')
      htmlDiv.style.display = "flex"
      htmlDiv.style.alignItems = "center"
      for (const ctrl of this.controls) {
        const ctrlHtmlEl = ctrl.onRender(node)
        if (ctrlHtmlEl && ctrl.selector(node, this.engine)) {
          htmlDiv.appendChild(ctrlHtmlEl)
        }
      }
      const barHeight = htmlDiv.getBoundingClientRect().height || 16
      let top = rect.y - barHeight - 6;
      if (top < positionLimit.top) {
        top = rect.y + rect.height + 2
        if (top > (positionLimit.bottom - barHeight)) {
          top = rect.y + 2
        }
      }

      const right = containerRect.width - (rect.x - containerRect.x) - rect.width;
      htmlDiv.style.position = "fixed"
      htmlDiv.style.right = numbToPx(right)
      htmlDiv.style.top = numbToPx(top - containerRect.y)
      htmlDiv.style.fontSize = "12px"
      htmlDiv.style.padding = "0px"
      htmlDiv.style.zIndex = (getMaxZIndex(elements?.[elements.length - 1]) + 1).toString()
      htmlDiv.style.userSelect = "none"

      canvas?.appendAux(htmlDiv)

      const divRect = htmlDiv.getBoundingClientRect()
      if ((rect.x + rect.width - divRect.width) < positionLimit.left) {
        htmlDiv.style.right = "auto"
        htmlDiv.style.left = numbToPx(positionLimit.left)
      }

      this.htmlElement = htmlDiv
      for (const element of elements) {
        this.resizeObserver.observe(element)
      }
    }
  }

  //20毫秒之内的事件，只刷新一次
  private refresh = () => {
    this.refreshedFlag = true
    setTimeout(() => {
      if (this.refreshedFlag) {
        this.render()
        this.refreshedFlag = false
      }
    }, 20)
  }

  destroy(): void {
    this.clear()
    this.nodeChangeUnsubscribe()
    this.unsubscribe()
    this.unsubscribeSelect()
    this.unCanvasScroll()
    this.draggingNodesOff?.()
    this.draggingResourceOff?.()
  }

  private positionLimit(documentId: ID) {
    const rect = this.engine.getShell().getCanvas(documentId)?.getDocumentBodyRect()
    if (!rect) {
      return null
    }
    return {
      right: 0,
      left: 0,
      top: rect.y,
      bottom: rect.y + rect.height
    }
  }

  private clear() {
    for (const ctrl of this.controls) {
      ctrl.teardown()
    }
    if (this.htmlElement) {
      this.htmlElement.remove()
    }
    this.htmlElement = null
  }
}

export const Toolbar = (engine: IDesignerEngine) => {
  return new ToolbarImpl(engine)
}
