import {RXNode} from './rxnode.js'

export class TagNode extends RXNode{
  constructor(tag) {
    super()
    this.meta.tag = tag
    this.label = tag
	}

  make(){
    return new TagNode(this.tag)
  }

}