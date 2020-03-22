import {RXNode} from './rxnode.js'
import {add, remove} from "../../basic/rxarray"

export class ClassNode extends RXNode{
  constructor(cssClass) {
    super()
    	//add(cssClass, this.meta.classList)
    	this.cssClass = cssClass
    	this.label = cssClass.replace(cssClass[0],cssClass[0].toUpperCase())
	}

  make(){
    return new ClassNode(this.cssClass)
  }


}