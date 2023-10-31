import { IDesignerEngine } from "../interfaces";
import { IDecorator, IDecoratorManager } from "../interfaces/decorator";
import { AddDecoratorEvent } from "../shell/events/canvas/AddDecoratorEvent";
import { RemoveDecoratorEvent } from "../shell/events/canvas/RemoveDecoratorEvent";

export type Decorators = {
  [key: string]: IDecorator | undefined
}

export type DocumentDecorators = {
  [key: string]: Decorators
}

export class DecoratorManager implements IDecoratorManager {
  private decorators: DocumentDecorators = {}
  constructor(private engine: IDesignerEngine) {
    //engine.getShell().subscribeTo(NodeMountedEvent, this.handleMounted)
  }

  addDecorator(decorator: IDecorator, documentId: string): void {
    if (!this.decorators[documentId]) {
      this.decorators[documentId] = {}
    }

    this.decorators[documentId][decorator.name] = decorator
    this.attachDecorator(decorator, documentId)
    this.engine.getShell().dispatch(new AddDecoratorEvent())
  }

  removeDecorator(name: string, documentId: string): void {
    const decorator = this.decorators?.[documentId]?.[name]
    if (decorator) {
      this.detachDecorator(decorator, documentId)
      delete this.decorators[documentId][name]
      this.engine.getShell().dispatch(new RemoveDecoratorEvent())
    }
  }
  getDecorator(name: string, documentId: string): IDecorator | undefined {
    return this.decorators?.[documentId]?.[name]
  }

  private handleMounted = (e: any/*NodeMountedEvent*/) => {
    const nodeId = e.nodeId
    if (!nodeId) {
      return
    }

    const el = this.engine.getShell().getElements(nodeId)
    if (!el) {
      //console.error("No Element")
      return
    }
    const documentId = this.engine.getMonitor().getNodeDocumentId(nodeId)
    if (!documentId) {
      console.error("No document")
      return
    }
    const decorators = this.decorators[documentId]
    const node = this.engine.getMonitor().getNode(nodeId)
    for (const name of Object.keys(decorators || {})) {
      const decorator = decorators[name]
      if (decorator && node) {
        decorator.decorate(el, node)
      }
    }
  }

  private attachDecorator(decorator: IDecorator, documentId: string) {
    const nodes = this.engine.getMonitor().getState().nodesById
    const shell = this.engine.getShell()
    for (const id of Object.keys(nodes)) {
      const node = nodes[id]
      if (node.documentId === documentId) {
        const el = shell.getElements(id)
        if (el) {
          decorator.decorate(el, node)
        }
      }
    }
  }

  private detachDecorator(decorator: IDecorator, documentId: string) {
    const nodes = this.engine.getMonitor().getState().nodesById
    const shell = this.engine.getShell()
    for (const id of Object.keys(nodes)) {
      const node = nodes[id]
      if (node.documentId === documentId) {
        const el = shell.getElements(id)
        if (el) {
          decorator.unDecorate(el)
        }
      }
    }
  }
}