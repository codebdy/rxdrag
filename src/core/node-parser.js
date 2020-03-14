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
        if(node){
          nodes.push(node)
        }
    }
    console.log(nodes)
    return nodes
  }

  paraseNode(element, parent){
    var node 
    if(element.nodeType === 3){
      let text = element.textContent.trim()
      if(!text){
        return ''
      }
      console.dir(element)
      let node =  new TextNode(text)
      node.parent = parent
      return node 
    }
    if(element.classList.contains('container')){
      node = new ClassNode('container')
    }
    else if(element.classList.contains('row')){
      node = new ClassNode('row')
    }
    else{
      node = new HtmlNode(element.tagName)
    }

    this.copyClassList(element.classList, node.meta.classList)
    for(var i = 0; i < element.childNodes.length; i++){
      let child = element.childNodes[i]

      let childNode = this.paraseNode(child, node)
      if(childNode){
        node.children.push(childNode)
      }
    }

    node.parent = parent

    return node
  }

  copyClassList(from, to){
    from.forEach(cssClass=>{
      to.push(cssClass)
    })
  }

}