import { IShellPane, ID, IDesignerEngine, IDriver, IDriverFactory, RXID_ATTR_NAME, IRect } from "core/interfaces";

export class IFrameCanvasImpl implements IShellPane {
  private dirvers: IDriver[] = []

  constructor(
    engine: IDesignerEngine,
    private iframe: HTMLIFrameElement,
    public id: ID,
    private driverFactories: IDriverFactory[]
  ) {
    for (const dirverFactory of this.driverFactories) {
      if (this.iframe.contentWindow?.document) {
        this.dirvers.push(dirverFactory(engine.getShell(), this.iframe.contentWindow?.document))
      }
    }
  }
  getContainerRect(): IRect | null {
    const rect = this.iframe.contentWindow?.document?.body?.getBoundingClientRect()
    if (!rect) {
      return null
    }
    return { width: rect.width, height: rect.height, x: 0, y: 0, }
  }

  appendChild(child: HTMLElement): void {
    this.body?.append(child)
  }
  contains(child: HTMLElement): boolean {
    return this.body?.contains(child) || false
  }
  removeChild(child: HTMLElement): void {
    this.body?.removeChild(child)
  }
  getElement(id: string): HTMLElement | null {
    return this.body?.querySelector(`[${RXID_ATTR_NAME}="${id}"]`) || null
  }
  getTopRect(nodeId: string): IRect | null {
    const rect = this.getElement(nodeId)?.getBoundingClientRect();
    if (rect) {
      const frameRect = this.iframe.getBoundingClientRect()
      const scale = frameRect.width / (this.iframe as any)['offsetWidth']
      rect.x = rect.x * scale + frameRect.x
      rect.y = rect.y * scale + frameRect.y

      return rect
    }
    return null
  }
  destory(): void {
    for (const driver of this.dirvers) {
      driver.teardown()
    }
    this.dirvers = []
  }

  private get body() {
    return this.iframe.contentWindow?.document.body
  }
}