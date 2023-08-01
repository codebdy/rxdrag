import { IShellPane, ID, IDesignerEngine, IDriver, IDriverFactory, RXID_ATTR_NAME, IRect } from "../interfaces";

export class ShadowCanvasImpl implements IShellPane {
  private drivers: IDriver[] = []

  constructor(
    engine: IDesignerEngine,
    private shadow: ShadowRoot,
    private roolElement: HTMLElement,
    public id: ID,
    private driverFactories: IDriverFactory[]
  ) {
    for (const driverFactory of this.driverFactories) {
      this.drivers.push(driverFactory(engine.getShell(), roolElement))
    }
  }

  appendChild(child: HTMLElement): void {
    this.shadow.append(child)
  }
  contains(child: HTMLElement): boolean {
    return this.shadow.contains(child)
  }
  removeChild(child: HTMLElement): void {
    this.shadow.removeChild(child)
  }
  getElement(id: string): HTMLElement | null {
    return this.shadow.querySelector(`[${RXID_ATTR_NAME}="${id}"]`)
  }

  getTopRect(nodeId: string): IRect | null {
    return this.getElement(nodeId)?.getBoundingClientRect() || null
  }
  
  getContainerRect(): IRect | null{
    return this.roolElement.getBoundingClientRect()
  }

  destroy(): void {
    for (const driver of this.drivers) {
      driver.teardown()
    }
    this.drivers = []
  }
}