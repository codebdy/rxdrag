import { IShellPane, ID, IDesignerEngine, IDriver, IDriverFactory, RXID_ATTR_NAME, IRect } from "core/interfaces";

export class ContainerImpl implements IShellPane {
  private dirvers: IDriver[] = []
  
  constructor(
    engine: IDesignerEngine,
    private roolElement: HTMLElement,
    public id: ID,
    private driverFactories: IDriverFactory[]
  ) {
		for (const dirverFactory of this.driverFactories) {
			this.dirvers.push(dirverFactory(engine.getShell(), roolElement))
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
  
  destory(): void {
		for (const driver of this.dirvers) {
			driver.teardown()
		}
		this.dirvers = []
  }
}