import {IComponents} from "./types"

export interface IComponentsParams {
  components: IComponents,
  registerComponents: (...components: IComponents[]) => void
}

