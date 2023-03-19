import { IMouseEventData } from "core/shell/events/mouse/AbstractMouseEvent";
import { IDesignerEngine, IRect, ITreeNode } from "core/interfaces";
import { before } from "core/utils/array-helper";
import { calcElementLayout } from "./element";

const dropInMargin = 8

export enum RelativePosition {
  In = "in",
  Left = "left",
  Top = "top",
  Right = "right",
  Bottom = "bottom",
}

export interface IDropPosition {
  position: RelativePosition | null;
  targetId: string;
}

export class Rect {
  rect: IRect;

  constructor(rect: IRect) {
    this.rect = rect;
  }

  get left() {
    return this.rect.x
  }

  get right() {
    return this.rect.x + this.rect.width
  }

  get top() {
    return this.rect.y
  }

  get bottom() {
    return this.rect.y + this.rect.height
  }

  isIn(eventData?: IMouseEventData) {
    if (!eventData) {
      return false;
    }
    return (
      this.left <= eventData.clientX &&
      this.right >= eventData.clientX &&
      this.top <= eventData.clientY &&
      this.bottom >= eventData.clientY
    );
  }

  isOnLeft(event?: IMouseEventData) {
    if (!event) {
      return false;
    }

    return this.left > event.clientX;
  }

  isOnRight(event?: IMouseEventData) {
    if (!event) {
      return false;
    }

    return this.right < event.clientX;
  }

  isOnTop(event?: IMouseEventData) {
    if (!event) {
      return false;
    }

    return this.top > event.clientY;
  }

  isOnBottom(event?: IMouseEventData) {
    if (!event) {
      return false;
    }

    return this.bottom < event.clientY;
  }

  atOutPosition(
    event: IMouseEventData | undefined,
    layout: "vertical" | "horizontal"
  ): RelativePosition | null {
    if (!event || !this.isIn(event)) {
      return null;
    }

    let xRatio =
      (event.clientX - this.rect.x) /
      (this.rect.x + this.rect.width - event.clientX);
    let yRatio =
      (event.clientY - this.rect.y) /
      (this.rect.y + this.rect.height - event.clientY);

    if (layout === "horizontal") {
      if (xRatio <= 1) {
        return RelativePosition.Left
      } else {
        return RelativePosition.Right
      }
    } else {
      if (yRatio <= 1) {
        return RelativePosition.Top
      } else {
        return RelativePosition.Bottom
      }
    }
  }
}

export class PositionJudger {
  constructor(private node: ITreeNode, private engine: IDesignerEngine) { }

  get dropInMargin() {
    let nodeName = this.node?.meta?.componentName;
    if (!nodeName) {
      return 0;
    }
    return this.node.parentId ? dropInMargin : 0;
  }

  //在此区域内，算是拖入
  get dragInRect() {
    const rect = this.engine.getShell().getElement(this.node.id)?.getBoundingClientRect();
    if (!rect) {
      return undefined;
    }
    return new Rect({
      ...rect,
      x: rect.x + this.dropInMargin,
      width: rect.width - this.dropInMargin * 2,
      y: rect.top + this.dropInMargin,
      height: rect.height - this.dropInMargin * 2,
    });
  }

  get rect() {
    const rect = this.engine.getShell().getElement(this.node.id)?.getBoundingClientRect();
    if (!rect) {
      return undefined;
    }
    return new Rect(rect);
  }


  isDragIn(eventData: IMouseEventData) {
    return this.dragInRect?.isIn(eventData);
  }

  firstChildAfterMouse(event: IMouseEventData, node?: ITreeNode) {
    let theNode = node || this.node;
    if (!theNode) {
      return;
    }
    for (let childId of theNode.children) {
      const child = this.engine.getMonitor().getNode(childId);
      if (child && this.isAfterMouse(event, child)) {
        return child;
      }
    }

    return undefined;
  }

  isAfterMouse(event: IMouseEventData, node?: ITreeNode): boolean {
    let theNode = node || this.node;
    if (!theNode) {
      return false;
    }

    const { clientX, clientY } = event;

    let rect = this.engine.getShell().getElement(theNode.id)?.getBoundingClientRect();
    if (!rect) {
      return false;
    }

    if (rect.left >= clientX) {
      return true;
    }

    if (rect.top >= clientY) {
      return true;
    }

    return false;
  }

  judgePosition(
    eventData: IMouseEventData
  ): IDropPosition | null {
    if (this.isDragIn(eventData)) {
      //如果没有子节点
      if (!this.node.children?.length) {
        return {
          targetId: this.node.id,
          position: RelativePosition.In
        }
      }

      //鼠标后第一个子节点
      const afterChild = this.firstChildAfterMouse(eventData);

      const parent = afterChild?.parentId ? this.engine.getMonitor().getNode(afterChild?.parentId) : undefined;
      let beforeId = afterChild?.id
        ? before(afterChild.id, parent?.children)
        : this.node.children?.[this.node.children.length - 1];

      let beforeChild = this.engine.getMonitor().getNode(beforeId);

      if (beforeChild && beforeChild.id !== this.node.id) {
        const element = this.engine.getShell().getElement(beforeChild.id)
        if (element) {
          const layout = calcElementLayout(element)
          if (layout === "horizontal") {
            return {
              targetId: beforeChild.id,
              position: RelativePosition.Right
            }
          } else {
            return {
              targetId: beforeChild.id,
              position: RelativePosition.Bottom
            }
          }
        } else {
          //console.error("can not find node element")
        }
      } else if (afterChild) {
        const element = this.engine.getShell().getElement(afterChild.id)
        if (element) {
          const layout = calcElementLayout(element)
          if (layout === "horizontal") {
            return {
              targetId: afterChild.id,
              position: RelativePosition.Left
            }
          } else {
            return {
              targetId: afterChild.id,
              position: RelativePosition.Top
            }
          }
        } else {
          //console.error("can not find node element")
        }
      }
      return null
    } else {
      if (!this.node.parentId) {
        //console.log('undefined1')
        return null;
      }
      const element = this.engine.getShell().getElement(this.node.id)
      if (element) {
        const layout = calcElementLayout(element)
        return {
          targetId: this.node.id,
          position: this.rect?.atOutPosition(eventData, layout || "vertical") || null,
        };
      } else {
        //console.error("can not find node element")
        return null
      }

    }
  }
}
