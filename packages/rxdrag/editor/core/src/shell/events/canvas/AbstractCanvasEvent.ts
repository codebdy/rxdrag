import { IEventData } from "../eventdata"

// export interface ICanvasEventData extends IEventData{
//   // scrollX: number
//   // scrollY: number
//   // width: number
//   // height: number
//   // view: Window
//   // innerWidth: number
//   // innerHeight: number
//   // target: EventTarget | null
// }

export class AbstractCanvasEvent {
  data?: IEventData
}
