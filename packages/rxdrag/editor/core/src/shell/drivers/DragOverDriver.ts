import { IDesignerShell, IDriver, IDriverFactory } from "../../interfaces"
import { DragMoveEvent } from "../events"

export class DragOverDriverImpl implements IDriver {

  private moveEvent: MouseEvent | null = null
  constructor(private shell: IDesignerShell, private htmlElement: Element | Node | HTMLElement) {
    this.htmlElement.addEventListener('dragover', this.onMouseMove as EventListener)
    this.htmlElement.addEventListener('mousemove', this.onMouseMove as EventListener)
  }

  onMouseMove = (e: MouseEvent | DragEvent) => {
    if (
      e.clientX === this.moveEvent?.clientX &&
      e.clientY === this.moveEvent?.clientY
    ) {
      return
    }

    if(!this.shell.dragStartEvent){
      return
    }
    
    this.shell.dispatch(
      new DragMoveEvent({
        offsetX: e.offsetX,
        offsetY: e.offsetY,
        clientX: e.clientX,
        clientY: e.clientY,
        pageX: e.pageX,
        pageY: e.pageY,
        target: e.target,
        view: e.view,
        altKey: e.altKey,
        ctrlKey: e.ctrlKey,
        shiftKey: e.shiftKey,
      }, e)
    )
    this.moveEvent = e
  }
  teardown(): void {
    this.htmlElement.removeEventListener('dragover', this.onMouseMove as EventListener)
    this.htmlElement.removeEventListener('mousemove', this.onMouseMove as EventListener)
  }
}

export const DragOverDriver: IDriverFactory = (
  shell: IDesignerShell,
  htmlElement: Element | Node | HTMLElement,
) => {
  return new DragOverDriverImpl(
    shell,
    htmlElement,
  )
}