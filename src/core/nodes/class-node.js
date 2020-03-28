import {RXNode} from './rxnode.js'
import {add, remove} from "../../basic/rxarray"

export class ClassNode extends RXNode{
  constructor(cssClass) {
    super()
      //add(cssClass, this.meta.classList)
      this.cssClass = cssClass
  }


  make(){
    return new ClassNode(this.cssClass)
  }
}