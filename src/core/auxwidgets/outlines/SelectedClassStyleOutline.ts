import { IDesignerEngine, ID, Unsubscribe } from "core";
import { IPlugin } from "core/interfaces/plugin";
import { DraggingNodesState } from "core/reducers/draggingNodes";
import { DraggingResourceState } from "core/reducers/draggingResource";
import { CanvasResizeEvent, CanvasScrollEvent } from "core/shell/events";
import { AddDecoratorEvent } from "core/shell/events/canvas/AddDecoratorEvent";
import { RemoveDecoratorEvent } from "core/shell/events/canvas/RemoveDecoratorEvent";
import { AUX_BACKGROUND_COLOR } from "../consts";

//这个不好用，有的地方会显示不全，废弃
export class SelectedClassStyleOutlineImpl implements IPlugin {
  name: string = "default.selected-outline";
  htmlStyle: HTMLElement;
  private unsubscribe: Unsubscribe;
  private nodeChangeUnsubscribe: Unsubscribe;
  private selecteNodes: ID[] | null = null
  private refreshedFlag = false
  private unCanvasScroll: Unsubscribe
  private unCanvasResize: Unsubscribe
  private unThemeModeChange: Unsubscribe
  private draggingNodesOff: Unsubscribe
  private draggingResourceOff: Unsubscribe
  private addDecoratorOff: Unsubscribe
  private removeDecoratorOff: Unsubscribe

  constructor(protected engine: IDesignerEngine) {
    if (!engine.getShell().getContainer) {
      console.error("Html 5 driver rootElement is undefined")
    }
    const style = document.createElement('style');
    style.innerHTML = `.rx-node-outline {  outline:solid 2px ${AUX_BACKGROUND_COLOR}; z-index:1;}`;
    this.htmlStyle = style
    //this.unmountUnsubscribe = this.engine.getShell().subscribeTo(NodeUnmountedEvent, this.handleNodeMounted)
    this.unsubscribe = engine.getMonitor().subscribeToSelectChange(this.listenSelectChange)
    this.nodeChangeUnsubscribe = engine.getMonitor().subscribeToHasNodeChanged(this.refresh)
    this.unCanvasScroll = this.engine.getShell().subscribeTo(CanvasScrollEvent, this.refresh)
    this.unCanvasResize = this.engine.getShell().subscribeTo(CanvasResizeEvent, this.refresh)
    this.unThemeModeChange = engine.getMonitor().subscribeToThemeModeChange(this.handleThemeChange)
    //this.unNodeMounted = this.engine.getShell().subscribeTo(NodeMountedEvent, this.handleNodeMounted)
    this.draggingNodesOff = this.engine.getMonitor().subscribeToDraggingNodes(this.handleDraggingNodes)
    this.draggingResourceOff = this.engine.getMonitor().subscribeToDraggingResource(this.handleDraggingResource)
    this.addDecoratorOff = this.engine.getShell().subscribeTo(AddDecoratorEvent, this.refresh)
    this.removeDecoratorOff = this.engine.getShell().subscribeTo(RemoveDecoratorEvent, this.refresh)
  }


  listenSelectChange = (selectedIds: ID[] | null) => {
    this.clear()

    for (const id of selectedIds || []) {
      const element = this.engine.getShell().getElement(id)
      const canvas = this.engine.getShell().getCanvas(this.engine.getMonitor().getNodeDocumentId(id) || "")
      if (!canvas?.contains(this.htmlStyle)) {
        canvas?.appendChild(this.htmlStyle)
      }

      if (element) {
        element.classList.add('rx-node-outline')
      }
    }
    this.selecteNodes = selectedIds
  }

  handleDraggingNodes = (dragging: DraggingNodesState | null) => {
    this.hideWhenDragging(!!dragging)
  }

  handleDraggingResource = (dragging: DraggingResourceState | null) => {
    this.hideWhenDragging(!!dragging)
  }

  private hideWhenDragging = (dragging: boolean) => {
    if (dragging) {
      for (const id of this.selecteNodes || []) {
        const element = this.engine.getShell().getElement(id)
        element?.classList.remove("rx-node-outline")
      }
    } else {
      for (const id of this.selecteNodes || []) {
        const element = this.engine.getShell().getElement(id)
        element?.classList.add("rx-node-outline")
      }
    }
  }

  onViewportChange = () => {
    this.refresh()
  }

  handleThemeChange = () => {
    setTimeout(() => {
      this.listenSelectChange(this.selecteNodes)
    }, 200)
  }

  refresh = () => {
    this.refreshedFlag = true
    setTimeout(() => {
      if (this.refreshedFlag) {
        this.listenSelectChange(this.selecteNodes)
        this.refreshedFlag = false
      }
    }, 20)
  }

  destory(): void {
    this.clear()
    this.unsubscribe()
    this.nodeChangeUnsubscribe()
    this.unCanvasScroll()
    this.unCanvasResize()
    this.unThemeModeChange()
    this.draggingNodesOff?.()
    this.draggingResourceOff?.()
    this.addDecoratorOff?.()
    this.removeDecoratorOff?.()
  }

  private clear() {
    for (const id of this.selecteNodes || []) {
      const element = this.engine.getShell().getElement(id)
      element?.classList.remove("rx-node-outline")
    }
  }
}

export const SelectedClassStyleOutline = (engine: IDesignerEngine) => {
  return new SelectedClassStyleOutlineImpl(engine)
}
