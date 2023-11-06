import { getRecentRxElement } from "@rxdrag/shared"
import { ID, NodeType, NodeStatus, RXID_ATTR_NAME, RX_NODE_TYPE_ATTR_NAME, RX_STATUS_ATTR_NAME } from "../../../interfaces"
import { IEventData } from "../eventdata"

export interface NodeRxInfo {
  rxId?: ID,
  nodeType?: NodeType,
  nodeStatus?: NodeStatus
}

export interface IMouseEventOriginData extends IEventData {
  offsetX: number,
  offsetY: number,
  clientX: number
  clientY: number
  pageX: number
  pageY: number
  target: EventTarget | null
  targetRx?: NodeRxInfo | null
  view: Window | null
  altKey: boolean
  ctrlKey: boolean
  shiftKey: boolean
}

export interface IMouseEventData extends IMouseEventOriginData {
  topClientX?: number
  topClientY?: number
  topPageX?: number
  topPageY?: number
}

export class AbstractMouseEvent {
  data: IMouseEventData
  originalEvent: MouseEvent

  constructor(data: IMouseEventOriginData, e: MouseEvent) {
    this.data = data || {
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      target: null,
      view: e.view
    }

    this.originalEvent = e

    const rxTarget = getRecentRxElement(data.target as HTMLElement, RXID_ATTR_NAME)
    this.data.targetRx = rxTarget && this.getRxProps(rxTarget)
    this.transformCoordinates()
  }

  private getRxProps = (target: HTMLElement) => {
    const rxId = target.getAttribute(RXID_ATTR_NAME)
    const nodeType = target.getAttribute(RX_NODE_TYPE_ATTR_NAME) as (NodeType | undefined)
    const nodeStatus = target.getAttribute(RX_STATUS_ATTR_NAME) as (NodeStatus | undefined)

    if (rxId) {
      return {
        rxId,
        nodeType: nodeType || NodeType.Node,
        nodeStatus,
      }
    }
  }

  transformCoordinates() {
    const { frameElement } = this.data?.view || {}
    if (frameElement) {
      const frameRect = frameElement.getBoundingClientRect()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const scale = frameRect.width / (frameElement as any)['offsetWidth']
      this.data.topClientX = this.data.clientX * scale + frameRect.x
      this.data.topClientY = this.data.clientY * scale + frameRect.y
      this.data.topPageX =
        this.data.pageX + frameRect.x - (this.data.view?.scrollX || 0)
      this.data.topPageY =
        this.data.pageY + frameRect.y - (this.data.view?.scrollY || 0)
      const topElement = document.elementFromPoint(
        this.data.topPageX,
        this.data.topClientY
      )
      if (topElement !== frameElement) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.data.target = topElement as any
      }
    } else {
      this.data.topClientX = this.data.clientX
      this.data.topClientY = this.data.clientY
      this.data.topPageX = this.data.pageX
      this.data.topPageY = this.data.pageY
    }
  }
}
