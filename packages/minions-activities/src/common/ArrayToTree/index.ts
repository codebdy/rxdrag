/* eslint-disable @typescript-eslint/no-explicit-any */
import { AbstractActivity, Activity, Input } from "@rxdrag/minions-runtime"
import { INodeDefine } from "@rxdrag/minions-schema"

export interface IArrayToTreeConfig {
  parentField?: number
}

@Activity(ArrayToTree.NAME)
export class ArrayToTree extends AbstractActivity<IArrayToTreeConfig> {
  public static NAME = "system.ArrayToTree"

  constructor(meta: INodeDefine<IArrayToTreeConfig>) {
    super(meta)
  }

  @Input()
  inputHandler = (inputValue?: any[], runContext?: object) => {
    const parentField = this.getParentField()
    const tree: any[] = []
    for (const node of inputValue || []) {
      if (!node?.[parentField]) {
        tree.push({ ...node, children: this.getChildren(node.id, inputValue) })
      }
    }
    this.next(tree, runContext)
  }

  getChildren = (id: string, inputValue?: any[]) => {
    const parentField = this.getParentField()
    const children: any[] = []
    for (const node of inputValue || []) {
      if (node?.[parentField]?.id === id) {
        children.push({ ...node, children: this.getChildren(node.id, inputValue) })
      }
    }
    return children
  }

  getParentField = () => {
    return this.config?.parentField || "parent"
  }
}
