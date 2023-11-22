import { IShellPane, ID, IDesignerEngine, IDriver, IDriverFactory, RXID_ATTR_NAME, IRect } from "../interfaces";
import { extractElements } from "./extractElements";
import { getMergedRect } from "./getMergedRect";

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
  getNodesRect(nodeIds: string[]): IRect | null {
    throw new Error("Method not implemented.");
  }
  getRootElement(): HTMLElement {
    return this.roolElement;
  }

  getDocumentBodyRect(): IRect | null {
    return this.roolElement.getBoundingClientRect()
  }

  appendAux(child: HTMLElement): void {
    this.roolElement.append(child)
  }
  contains(child: HTMLElement): boolean {
    return this.roolElement.contains(child)
  }

  getElements(id: string): HTMLElement[] | null {
    const nodeLists = this.roolElement.querySelectorAll(`[${RXID_ATTR_NAME}="${id}"]`)
    return extractElements(nodeLists)
  }

  getNodeRect(nodeId: string): IRect | null {
    const rects = this.getElements(nodeId)?.map(element => element.getBoundingClientRect());
    if (!rects?.length) {
      return null
    }
    return getMergedRect(rects);
  }

  destroy(): void {
    for (const driver of this.drivers) {
      driver.teardown()
    }
    this.drivers = []
  }
}