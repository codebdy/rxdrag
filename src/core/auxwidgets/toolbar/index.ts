import { IDesignerEngine, ID, Unsubscribe } from "core";
import { CanvasResizeEvent, CanvasScrollEvent } from "core/shell/events";
import { IPlugin } from "core/interfaces/plugin";
import { addZIndex } from "core/utils/add-zindex";
import { numbToPx } from "../utils/numbToPx";
import { CloneButton } from "./controls/CloneButton";
import { DeleteButton } from "./controls/DeleteButton";
import { ComponentSelector } from "./controls/Selector";
import { IAuxControl, IAuxToolbar } from "./interfaces";
import { MoveButton } from "./controls/MoveButton";
import { NodeMountedEvent } from "core/shell/events/canvas/NodeMountedEvent";
import { DraggingNodesState } from "core/reducers/draggingNodes";
import { DraggingResourceState } from "core/reducers/draggingResource";

export class ToolbarImpl implements IPlugin, IAuxToolbar {
  name: string = "default.toolbar";
  private unsubscribe: Unsubscribe;
  private nodeChangeUnsubscribe: Unsubscribe;
  private controls: IAuxControl[] = [];
  private htmlElement: HTMLElement | null = null
  private unViewporScroll: Unsubscribe
  private unViewporChange: Unsubscribe
  private unThemeModeChange: Unsubscribe
  private unNodeMounted: Unsubscribe
  private draggingNodesOff: Unsubscribe
  private draggingResourceOff: Unsubscribe
  constructor(protected engine: IDesignerEngine,) {
    if (!engine.getShell().getContainer) {
      console.error("Html 5 driver rootElement is undefined")
    }

    this.addControl(new ComponentSelector(engine))
    this.addControl(new CloneButton(engine))
    this.addControl(new MoveButton(engine))
    this.addControl(new DeleteButton(engine))
    this.unsubscribe = engine.getMonitor().subscribeToCurrentNodeChanged(this.refresh)
    this.nodeChangeUnsubscribe = engine.getMonitor().subscribeToHasNodeChanged(this.refresh)
    this.unViewporScroll = this.engine.getShell().subscribeTo(CanvasScrollEvent, this.refresh)
    this.unViewporChange = this.engine.getShell().subscribeTo(CanvasResizeEvent, this.refresh)
    this.unThemeModeChange = engine.getMonitor().subscribeToThemeModeChange(this.handleThemeChange)
    this.unNodeMounted = this.engine.getShell().subscribeTo(NodeMountedEvent, this.handleNodeMounted)
    this.draggingNodesOff = this.engine.getMonitor().subscribeToDraggingNodes(this.handleDraggingNodes)
    this.draggingResourceOff = this.engine.getMonitor().subscribeToDraggingResource(this.handleDraggingResource)
  }

  handleDraggingNodes = (dragging: DraggingNodesState | null) => {
    this.hideWhenDragging(!!dragging)
  }

  handleDraggingResource = (dragging: DraggingResourceState | null) => {
    this.hideWhenDragging(!!dragging)
  }

  private hideWhenDragging = (dragging: boolean) => {
    if (dragging) {
      if(this.htmlElement){
        this.htmlElement.style.display = "none"
      }
    } else {
      if(this.htmlElement){
        this.htmlElement.style.display = "flex"
      }
    }
  }

  handleNodeMounted = (e: NodeMountedEvent) => {
    this.refresh()
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
    const rootEl = this.engine.getShell().getContainer()
    divEl && rootEl?.contains(divEl) && rootEl?.removeChild(divEl)
    this.htmlElement = null
    if (!node) {
      if (divEl) {
        divEl.remove()
      }
      return
    }
    const element = node.id && this.engine.getShell().getElement(node.id)
    const positionLimit = this.positionLimit(node.documentId)
    if (element && positionLimit) {
      const rect = element.getBoundingClientRect();
      const bodyRect = element.ownerDocument.body.getBoundingClientRect()

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
      const right = bodyRect.width - rect.x - rect.width;
      htmlDiv.style.position = "fixed"
      htmlDiv.style.right = numbToPx(right)
      htmlDiv.style.top = numbToPx(top)
      htmlDiv.style.fontSize = "12px"
      htmlDiv.style.padding = "0px"
      htmlDiv.style.zIndex = addZIndex(window.getComputedStyle(htmlDiv).zIndex, 10)
      htmlDiv.style.userSelect = "none"

      rootEl?.appendChild(htmlDiv)

      const divRect = htmlDiv.getBoundingClientRect()
      if ((rect.x + rect.width - divRect.width) < positionLimit.left) {
        htmlDiv.style.right = "auto"
        htmlDiv.style.left = numbToPx(positionLimit.left)
      }

      this.htmlElement = htmlDiv
    }
  }

  handleThemeChange = () => {
    setTimeout(() => {
      this.render()
    }, 200)
  }

  private refresh = () => {
    this.render()
  }

  destory(): void {
    this.clear()
    this.nodeChangeUnsubscribe()
    this.unsubscribe()
    this.unViewporScroll()
    this.unViewporChange()
    this.unThemeModeChange()
    this.unNodeMounted()
    this.draggingNodesOff?.()
    this.draggingResourceOff?.()
  }

  private positionLimit(documentId: ID) {
    const bodyRect = document.body.getBoundingClientRect()
    const rect = this.getRootElement(documentId)?.getBoundingClientRect()
    if (!rect) {
      return null
    }
    return {
      right: bodyRect.width - rect.x - rect.width,
      left: rect.left,
      top: rect.y,
      bottom: rect.top + rect.height
    }
  }

  private getRootElement(documentId: ID) {
    const root = this.engine.getMonitor().getDocumentRootNode(documentId)

    return root?.id ? this.engine.getShell().getElement(root?.id) : null
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
