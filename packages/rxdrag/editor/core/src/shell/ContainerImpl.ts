import { IShellPane, ID, IDesignerEngine, IDriver, IDriverFactory, RXID_ATTR_NAME, IRect } from "../interfaces";

export class ContainerImpl implements IShellPane {
  private drivers: IDriver[] = []
  
  constructor(
    engine: IDesignerEngine,
    private roolElement: HTMLElement,
    public id: ID,
    private driverFactories: IDriverFactory[]
  ) {
		for (const driverFactory of this.driverFactories) {
			this.drivers.push(driverFactory(engine.getShell(), roolElement))
		}
  }
  getContainerRect(): IRect | null {
    return this.roolElement.getBoundingClientRect()
  }

  appendChild(child: HTMLElement): void {
    this.roolElement.append(child)
  }
  contains(child: HTMLElement): boolean {
    return this.roolElement.contains(child)
  }
  removeChild(child: HTMLElement): void {
    if(this.contains(child)){
       this.roolElement.removeChild(child)
    }
  }
  getElement(id: string): HTMLElement | null {
    return this.roolElement.querySelector(`[${RXID_ATTR_NAME}="${id}"]`)
  }

  getTopRect(nodeId: string): IRect | null {
    return this.getElement(nodeId)?.getBoundingClientRect() || null
  }
  
  destroy(): void {
		for (const driver of this.drivers) {
			driver.teardown()
		}
		this.drivers = []
  }
}