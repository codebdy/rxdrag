import {RXNode} from './rxnode.js'

export class HtmlNode extends Node{
  constructor(tag) {
    super()
    this.meta.tag = tag
    this.label = tag
	}
}