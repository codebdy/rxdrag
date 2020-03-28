import {RXNode} from './rxnode.js'

export class TagNode extends RXNode{
  constructor(tag) {
    super()
    this.meta.tag = tag
    this.label = tag
    this.labelToCapitalize()
	}

  make(){
  	let node = new TagNode(this.meta.tag)
  	node.label = this.label
  	return node
  }

}