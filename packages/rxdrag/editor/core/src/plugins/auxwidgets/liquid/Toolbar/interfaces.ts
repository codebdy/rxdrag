import { ITreeNode, IDesignerEngine } from "../../../../interfaces"

export interface IAuxToolbar {
  addControl(control: IAuxControl, index?: number): void
  replaceControl(control: IAuxControl): void
}

// export interface IAuxToolbarView {

// }

export interface IAuxControl {
  //唯一名，用于覆盖默认设置
  name: string
  selector: (node: ITreeNode, engine?: IDesignerEngine) => boolean
  onRender(node: ITreeNode): HTMLElement | null
  teardown(): void
}

