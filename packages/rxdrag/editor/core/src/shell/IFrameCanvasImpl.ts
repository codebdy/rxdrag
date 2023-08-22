import { IShellPane, ID, IDesignerEngine, IDriver, IDriverFactory, RXID_ATTR_NAME, IRect } from "../interfaces";
import { extractElements } from "./extractElements";
import { getMergedRect } from "./getMergedRect";

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

  getRootElement(): HTMLElement {
    return this.iframe.contentWindow?.document.body || this.iframe;
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
  getElements(id: string): HTMLElement[] | null {
    const nodeLists = this.body?.querySelectorAll(`[${RXID_ATTR_NAME}="${id}"]`)
    return extractElements(nodeLists)
  }

  getNodeRect(nodeId: string): IRect | null {
    const rects = this.getElements(nodeId)?.map(element => element.getBoundingClientRect());
    if (!rects?.length) {
      return null
    }

    //const frameRect = this.iframe.getBoundingClientRect()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // const scale = frameRect.width / (this.iframe as any)['offsetWidth']
    // const newRects = rects.map((rect) => {
    //   return (
    //     {
    //       x: rect.x * scale + frameRect.x,
    //       y: rect.y * scale + frameRect.y,
    //       height: rect.height * scale,
    //       width: rect.width * scale,
    //     }
    //   )
    // })
    return getMergedRect(rects);
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



