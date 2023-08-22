import { IShellPane, ID, IDesignerEngine, IDriver, IDriverFactory, RXID_ATTR_NAME, IRect } from "../interfaces";
import { extractElements } from "./extractElements";
import { getMergedRect } from "./getMergedRect";

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
  getRootElement(): HTMLElement {
    return this.roolElement;
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
  getElements(id: string): HTMLElement[] | null {
    const nodeLists = this.shadow.querySelectorAll(`[${RXID_ATTR_NAME}="${id}"]`)
    return extractElements(nodeLists)
  }

  getTopRect(nodeId: string): IRect | null {
    const rects = this.getElements(nodeId)?.map(element => element.getBoundingClientRect());
    if (!rects?.length) {
      return null
    }
    return getMergedRect(rects);
  }

  getContainerRect(): IRect | null {
    return this.roolElement.getBoundingClientRect()
  }

  destroy(): void {
    for (const driver of this.drivers) {
      driver.teardown()
    }
    this.drivers = []
  }
}