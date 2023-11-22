import { IShellPane, ID, IDesignerEngine, IDriver, IDriverFactory, RXID_ATTR_NAME, IRect } from "../interfaces";
import { extractElements } from "./extractElements";
import { getMergedRect } from "./getMergedRect";

export class CanvasImpl implements IShellPane {
  private drivers: IDriver[] = []

  constructor(
    public id: ID,
    engine: IDesignerEngine,
    //根节点Id
    private rootNodeId: string,
    private driverFactories: IDriverFactory[]
  ) {
    for (const driverFactory of this.driverFactories) {
      this.drivers.push(driverFactory(engine.getShell(), document))
    }
  }


  getRootElement(): HTMLElement {
    return document.body;
  }

  getDocumentBodyRect(): IRect | null {
    // const containerElement = document.querySelector(`[${RXID_ATTR_NAME}="${this.rootNodeId}"]`)
    // const rect = containerElement?.getBoundingClientRect()
    // if (!rect) {
    //   return null
    // }
    // return { width: rect.width, height: rect.height, x: 0, y: 0, }

    return document.body.getBoundingClientRect()
  }

  appendAux(child: HTMLElement): void {
    const auxContainer = document.getElementById(`aux-${this.id}`)
    if (auxContainer) {
      auxContainer.append(child)
    } else {
      document.body?.append(child)
    }
  }
  contains(child: HTMLElement): boolean {
    return document.body?.contains(child) || false
  }

  getElements(id: string): HTMLElement[] | null {
    const nodeLists = document.body?.querySelectorAll(`[${RXID_ATTR_NAME}="${id}"]`)
    return extractElements(nodeLists)
  }

  getNodeRect(nodeId: string): IRect | null {
    const rects = this.getElements(nodeId)?.map(element => {
      const rect = element.getBoundingClientRect()
      return {
        ...rect,
        x: rect.left - window.scrollX,
        y: rect.top - window.scrollY,
        height: rect.height,
        width: rect.width
      }
    });
    if (!rects?.length) {
      return null
    }
    return getMergedRect(rects);
  }

  getNodesRect(nodeIds: string[]): IRect | null {
    const rects = nodeIds.map(id => this.getNodeRect(id)).filter(rect => !!rect) as IRect[]
    return getMergedRect(rects);
  }

  destroy(): void {
    for (const driver of this.drivers) {
      driver.teardown()
    }
    this.drivers = []
  }
}



