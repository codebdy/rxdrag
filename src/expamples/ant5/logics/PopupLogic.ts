import { Props } from "runner/reaction/classes/props";
import { InputHandlers, ILogic } from "runner/reaction/interfaces";


export class PopupLogic implements ILogic {
  name: string = "PopupLogic";
  state: any;
  inputs: InputHandlers = {};

  constructor(private $props: Props) {
    this.inputs["close"] = this.close
    this.inputs["open"] = this.open
  }

  close = () => {
    this.$props.setValue("open", false)
  }

  open = () =>{
    this.$props.setValue("open", true)
  }
}