import {Node} from '../node.js'
import {add, remove} from "../../basic/rxarray"

export class CharNode extends Node{
  constructor(char, parent) {
    super()
    this.parent = parent
    this.acceptedChildren = []
    this.char = char
    this.editMarginStyle = {}
    this.widthDropMargin = 5;
    this.heightDropMargin = 5;
    this.isCharNode = true;
  }

  toViewModel(){
    return {
      styles:{},
      classList:['char-node'],
      attributes:{},
      innerHTML : this.char,
      name:'span',
      on:{
        onmousemove:this.mousemove,
        onmouseover:this.mouseover,
        onmouseout:this.mouseout,
        //onclick:this.onclick,
      }
    }
  }

}