import {RXNode} from './rxnode.js'
import {add, remove} from "../../basic/rxarray"

export class ClassNode extends RXNode{
  constructor(char) {
    super()
    this.acceptedChildren = []
    this.meta.innerHTML = char
    this.editMarginStyle = {}
  }
}