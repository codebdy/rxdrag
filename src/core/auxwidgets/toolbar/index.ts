import { IDesignerEngine, ID, Unsubscribe, ITreeNode } from "core";
import { CanvasScrollEvent } from "core/shell/events";
import { IPlugin } from "core/interfaces/plugin";
import { numbToPx } from "../utils/numbToPx";
import { CloneButton } from "./controls/CloneButton";
import { DeleteButton } from "./controls/DeleteButton";
import { ComponentSelector } from "./controls/Selector";
import { IAuxControl, IAuxToolbar } from "./interfaces";
import { MoveButton } from "./controls/MoveButton";
import { DraggingNodesState } from "core/reducers/draggingNodes";
import { DraggingResourceState } from "core/reducers/draggingResource";
import { LockButton } from "./controls/LockButton";
import { getMaxZIndex } from "../outlines/getMaxZIndex";

export class ToolbarImpl implements IPlugin, IAuxToolbar {
  name: string = "default.toolbar";
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
    this.unCanvasScroll = this.engine.getShell().subscribeTo(CanvasScrollEvent, this.refresh)
    this.draggingNodesOff = this.engine.getMonitor().subscribeToDraggingNodes(this.handleDraggingNodes)
    this.draggingResourceOff = this.engine.getMonitor().subscribeToDraggingResource(this.handleDraggingResource)
  }

  onResize = () => {
    this.refresh()
  }

  //临时措施，跟踪popup变化
  handleSelectChange = (selectedIds: ID[] | null) => {
    this.refresh()
    if (selectedIds?.length && !this.engine.getShell().getElement(selectedIds?.[0])) {
      setTimeout(() => {
        this.refresh()
      }, 100)
    }
  }

  currentNodeChanged = (node: ITreeNode) => {
    this.resizeObserver.disconnect()
    this.refresh()
    if (node && !this.engine.getShell().getElement(node.id)) {
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
    const canvas = this.engine.getShell().getCanvas(this.engine.getMonitor().getNodeDocumentId(node?.id || "") || "")
    divEl && canvas?.contains(divEl) && canvas?.removeChild(divEl)
    this.htmlElement = null
    if (!node) {
      if (divEl) {
        divEl.remove()
      }
      return
    }
    const element = node.id && this.engine.getShell().getElement(node.id)
    const positionLimit = this.positionLimit(node.documentId)

    const containerRect = canvas?.getContainerRect()

    if (element && positionLimit && containerRect) {
      const rect = element.getBoundingClientRect();

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
      htmlDiv.style.zIndex = (getMaxZIndex(element) + 1).toString()
      htmlDiv.style.userSelect = "none"

      canvas?.appendChild(htmlDiv)

      const divRect = htmlDiv.getBoundingClientRect()
      if ((rect.x + rect.width - divRect.width) < positionLimit.left) {
        htmlDiv.style.right = "auto"
        htmlDiv.style.left = numbToPx(positionLimit.left)
      }

      this.htmlElement = htmlDiv
      this.resizeObserver.observe(element)
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

  destory(): void {
    this.clear()
    this.nodeChangeUnsubscribe()
    this.unsubscribe()
    this.unsubscribeSelect()
    this.unCanvasScroll()
    this.draggingNodesOff?.()
    this.draggingResourceOff?.()
  }

  private positionLimit(documentId: ID) {
    const bodyRect = document.body.getBoundingClientRect()
    const rect = this.engine.getShell().getCanvas(documentId)?.getContainerRect()
    if (!rect) {
      return null
    }
    return {
      right: bodyRect.width - rect.x - rect.width,
      left: rect.x,
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
