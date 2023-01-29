import { Props } from "runner/reaction/classes/props";
import { InputHandlers, IReaction } from "runner/reaction/interfaces/interfaces";


export class PopupLogic implements IReaction {
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