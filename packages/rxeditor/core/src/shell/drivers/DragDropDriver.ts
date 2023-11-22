/* eslint-disable @typescript-eslint/no-explicit-any */
import { DragStartEvent, DragStopEvent } from "../../shell/events/mouse"
import { IDesignerShell, IDriver, IDriverFactory } from "../../interfaces"

export class DragDropDriverImpl implements IDriver {
  private onMouseDownAt = 0
  private startEvent: MouseEvent | null = null

  constructor(private shell: IDesignerShell, private htmlElement: Element | Node | HTMLElement) {
    this.attachEvent("mousedown", this.onMouseDown)
    this.attachEvent('dragend', this.onMouseUp)
    this.attachEvent('dragstart', this.onStartDrag)
    this.documentEl()?.addEventListener('mouseup', this.onMouseUp as EventListener)
  }

  onMouseDown = (e: MouseEvent) => {
    if (e.button !== 0 || e.ctrlKey || e.metaKey) {
      return
    }
    if (
      (e.target as any)['isContentEditable'] ||
      (e.target as any)['contentEditable'] === 'true'
    ) {
      return true
    }
    if ((e.target as any)?.['closest']?.('.monaco-editor')) return
    this.startEvent = e
    this.shell.dragStartEvent = undefined
    this.onMouseDownAt = Date.now()
    this.attachEvent('mousemove', this.onDistanceChange)
  }

  onMouseUp = (e: MouseEvent) => {
    if (this.shell.dragStartEvent) {
      this.shell.dispatch(
        new DragStopEvent({
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
    }
    this.detachEvent('mousemove', this.onDistanceChange)
    this.shell.dragStartEvent = undefined
  }

  onContextMenuWhileDragging = (e: MouseEvent) => {
    e.preventDefault()
  }

  onStartDrag = (e: MouseEvent | DragEvent) => {
    if (this.shell.dragStartEvent) return

    this.startEvent = this.startEvent || e

    this.attachEvent(
      'contextmenu',
      this.onContextMenuWhileDragging,
    )

    this.shell.dispatch(
      new DragStartEvent({
        offsetX: e.offsetX,
        offsetY: e.offsetY,
        clientX: this.startEvent.clientX,
        clientY: this.startEvent.clientY,
        pageX: this.startEvent.pageX,
        pageY: this.startEvent.pageY,
        target: (this.startEvent as any).path?.[0] || this.startEvent.target,
        view: this.startEvent.view,
        altKey: this.startEvent.altKey,
        ctrlKey: this.startEvent.ctrlKey,
        shiftKey: this.startEvent.shiftKey,
      }, e)
    )
    this.shell.dragStartEvent = this.startEvent
  }

  onDistanceChange = (e: MouseEvent) => {
    if (!this.startEvent) {
      return
    }

    const distance = Math.sqrt(
      Math.pow(e.pageX - this.startEvent.pageX, 2) +
      Math.pow(e.pageY - this.startEvent.pageY, 2)
    )
    const timeDelta = Date.now() - this.onMouseDownAt
    if (timeDelta > 10 && e !== this.startEvent && distance > 4) {
      this.detachEvent('mousemove', this.onDistanceChange)
      this.onStartDrag(e)
    }
  }

  private attachEvent<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
  ): void
  private attachEvent(
    type: string,
    listener: EventListenerOrEventListenerObject,
  ): void
  private attachEvent(type: any, listener: any) {
    this.htmlElement?.addEventListener(type, listener as any)
  }

  private detachEvent<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
  ): void
  private detachEvent(
    type: string,
    listener: EventListenerOrEventListenerObject,
  ): void
  private detachEvent(type: any, listener: any) {
    this.htmlElement?.removeEventListener(type, listener)
  }

  teardown(): void {
    this.detachEvent('mousedown', this.onMouseDown)
    this.detachEvent('dragstart', this.onStartDrag)
    this.detachEvent('dragend', this.onMouseUp)
    this.documentEl()?.removeEventListener('mouseup', this.onMouseUp as EventListener)
    this.detachEvent('mousemove', this.onDistanceChange)
    this.detachEvent(
      'contextmenu',
      this.onContextMenuWhileDragging,
    )
  }

  private documentEl() {
    return this.htmlElement?.ownerDocument || this.htmlElement
  }
}

export const DragDropDriver: IDriverFactory = (
  shell: IDesignerShell,
  htmlElement: Element | Node | HTMLElement,
) => {
  return new DragDropDriverImpl(
    shell,
    htmlElement,
  )
}