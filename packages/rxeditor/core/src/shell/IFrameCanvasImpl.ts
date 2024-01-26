import { IShellPane, ID, IDesignerEngine, IDriver, IDriverFactory, RXID_ATTR_NAME, IRect } from "../interfaces";
import { extractElements } from "./extractElements";
import { getMergedRect } from "./getMergedRect";

export class IFrameCanvasImpl implements IShellPane {
  private drivers: IDriver[] = []

  constructor(
    engine: IDesignerEngine,
    private iframe: HTMLIFrameElement,
    //document id
    public id: ID,
    private driverFactories: IDriverFactory[]
  ) {
    for (const driverFactory of this.driverFactories) {
      if (this.iframe.contentWindow?.document) {
        this.drivers.push(driverFactory(engine.getShell(), this.iframe.contentWindow?.document))
      }
    }
  }
  getRootElement(): HTMLElement | null {
    return this.body || null
  }
  getElements(id: string): HTMLElement[] | null {
    const nodeLists = this.body?.querySelectorAll(`[${RXID_ATTR_NAME}="${id}"]`)
    return extractElements(nodeLists)
  }
  getDocumentBodyRect(): IRect | null {
    return this.iframe.contentWindow?.document?.body.getBoundingClientRect() || null
  }
  getNodeRect(nodeId: string): IRect | null {
    const rects = this.getElements(nodeId)?.map(element => element.getBoundingClientRect());
    if (!rects?.length) {
      return null
    }
    return getMergedRect(rects);
  }
  getNodesRect(nodeIds: string[]): IRect | null {
    throw new Error("Method not implemented.");
  }
  appendAux(child: HTMLElement): void {
    this.body?.append(child)
  }

  // appendChild(child: HTMLElement): void {
  //   this.body?.append(child)
  // }
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