import {RXNode} from './rxnode.js'

export class HtmlNode extends RXNode{
  constructor(tag) {
    super()
    this.meta.tag = tag
    this.label = tag
	}
}