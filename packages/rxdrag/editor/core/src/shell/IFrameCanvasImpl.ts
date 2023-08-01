import { IShellPane, ID, IDesignerEngine, IDriver, IDriverFactory, RXID_ATTR_NAME, IRect } from "../interfaces";

export class IFrameCanvasImpl implements IShellPane {
  private drivers: IDriver[] = []

  constructor(
    engine: IDesignerEngine,
    private iframe: HTMLIFrameElement,
    public id: ID,
    private driverFactories: IDriverFactory[]
  ) {
    for (const driverFactory of this.driverFactories) {
      if (this.iframe.contentWindow?.document) {
        this.drivers.push(driverFactory(engine.getShell(), this.iframe.contentWindow?.document))
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const scale = frameRect.width / (this.iframe as any)['offsetWidth']
      rect.x = rect.x * scale + frameRect.x
      rect.y = rect.y * scale + frameRect.y

      return rect
    }
    return null
  }
  destroy(): void {
    for (const driver of this.drivers) {
      driver.teardown()
    }
    this.drivers = []
  }

  private get body() {
    return this.iframe.contentWindow?.document.body
  }
}