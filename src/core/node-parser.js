import {ClassNode} from './nodes/class-node.js'
import {HtmlNode} from './nodes/html-node.js'
import {TextNode} from './nodes/text-node.js'

export class NodeParser{
  constructor() {
    this.$dom = document.createElement('div')
  }

  parse(html){
    this.$dom.innerHTML = html

    //console.log(this.$dom.childNodes)
    let nodes = []
    for(var i = 0; i < this.$dom.childNodes.length; i++){
        let node = this.paraseNode(this.$dom.childNodes[i])
        nodes.push(node)
    }

    return nodes
  }

  paraseNode(element){
    var node 
    if(element.classList.contains('container')){
      node = new ClassNode('container')
    }
    else{
      node = new HtmlNode
    }
    for(var i = 0; i < element.childNodes.length; i++){
      let child = element.childNodes[i]
      console.log(child, child.nodeName, child.nodeType)
      node.children.push(this.paraseNode(child))
    }

    return node
  }

}