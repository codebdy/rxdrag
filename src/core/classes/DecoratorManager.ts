import { IDesignerEngine } from "core/interfaces";
import { IDecorator, IDecoratorManager } from "core/interfaces/decorator";
import { NodeMountedEvent } from "core/shell/events/canvas/NodeMountedEvent";

export type Decorators = {
  [key: string]: IDecorator | undefined
}

export type DocumentDecorators = {
  [key: string]: Decorators
}

export class DecoratorManager implements IDecoratorManager {
  private decorators: DocumentDecorators = {}
  constructor(private engine: IDesignerEngine) {
    engine.getShell().subscribeTo(NodeMountedEvent, this.handleMounted)
  }

  addDecorator(decorator: IDecorator, documentId: string): void {
    if (!this.decorators[documentId]) {
      this.decorators[documentId] = {}
    }

    this.decorators[documentId][decorator.name] = decorator
    this.attachDecorator(decorator, documentId)
  }

  removeDecorator(name: string, documentId: string): void {
    const decorator = this.decorators?.[documentId]?.[name]
    if (decorator) {
      this.detachDecorator(decorator, documentId)
      delete this.decorators[documentId][name]
    }
  }
  getDecorator(name: string, documentId: string): IDecorator | undefined {
    return this.decorators?.[documentId]?.[name]
  }

  private handleMounted = (e: NodeMountedEvent) => {
    const nodeId = e.nodeId
    if (!nodeId) {
      console.error("No Node")
      return
    }

    const el = this.engine.getShell().getElement(nodeId)
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

    for (const name of Object.keys(decorators || {})) {
      const decorator = decorators[name]
      if (decorator) {
        decorator.decorate(el)
      }
    }
  }

  private attachDecorator(decorator: IDecorator, documentId: string) {
    const nodes = this.engine.getMonitor().getState().nodesById
    const shell = this.engine.getShell()
    for (const id of Object.keys(nodes)) {
      const node = nodes[id]
      if (node.documentId === documentId) {
        const el = shell.getElement(id)
        if (el) {
          decorator.decorate(el)
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
        const el = shell.getElement(id)
        if (el) {
          decorator.unDecorate(el)
        }
      }
    }
  }
}