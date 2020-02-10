import {Node} from "../base/node"

export class HTMLDiv extends Node{
  constructor() {
    super()
    this.widthDropMargin = 15;
  }

  make(){
    return new HTMLDiv
  }

  toViewModel(){
    let model = super.toViewModel()
    model.label.text = "Div"
    //model.classList.push('col')
    return model
  }
}
