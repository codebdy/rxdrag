import {Node} from '../node.js'
import {add, remove} from "../../basic/rxarray"

export class CharNode extends Node{
  constructor(char, parent) {
    super()
    this.parent = parent
    this.char = char
    this.isCharNode = true;
    this.rule = {}
    this.rule.acceptedChildren = []
    this.rule.editMarginStyle = {}
    this.rule.dropInMargin = 5;
  }

  make(){
    return new CharNode
  }

  changeTextnodeToCharNode(){
  }

  toViewModel(){
    return {
      styles:{},
      classList:['char-node'],
      attributes:{},
      innerHTML : this.char,
      tag:'span',
      on:{
        onmousemove:this.mousemove,
        onmouseover:this.mouseover,
        onmouseout:this.mouseout,
        //onclick:this.onclick,
      }
    }
  }

}