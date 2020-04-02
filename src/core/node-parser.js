import {ClassNode} from './nodes/class-node.js'
import {TagNode} from './nodes/tag-node.js'
import {TextNode} from './nodes/text-node.js'
import rules from './rules'
import commonRule from'./rules/common-rule'

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
    return nodes
  }

  paraseNode(element, parent){
    var node 
    if(element.nodeType === 3){
      let text = element.textContent//.trim()
      if(!text){
        return ''
      }
      let node =  new TextNode(text)
      node.parent = parent
      return node 
    }

    //暂不处理注释
    if(element.nodeType === 8){
      return ''
    }

    if(element.classList.contains('container')){
      node = new ClassNode('container')
    }

    let clssNode = this.parseClassNode(element)
    node = clssNode ? clssNode : this.parseTagNode(element)

    this.copyClassList(element.classList, node.meta.classList)
    for(var i = 0; i < element.childNodes.length; i++){
      let child = element.childNodes[i]

      let childNode = this.paraseNode(child, node)
      if(childNode){
        node.children.push(childNode)
      }
    }

    this.parseAttributes(node, element)
    node.markDefaultMeta()

    node.parent = parent

    return node
  }

  parseAttributes(node, element){
    let attrs = element.attributes;
     for(var i = 0; i < attrs.length; i++){
      let attrName = attrs[i]['nodeName'];
      let attrValue = attrs[i]['nodeValue'];
      if(attrName.toLowerCase() !== "class"){
        node.meta.attributes[attrName] = attrValue
      }
    }
  }

  parseClassNode(element){
    for(var ruleName in rules.classRules){
      let rule = rules.classRules[ruleName]
      rule.classes = rule.classes ? rule.classes : [ruleName]

      for(var i = 0; i < rule.classes.length; i++){
        let cssClass = rule.classes[i].toLowerCase()
        if(element.classList.contains(cssClass)){
          let node = new ClassNode(cssClass)
          node.meta.tag = element.tagName.toLowerCase()
          node.setLabel(rule.label ? rule.label : ruleName)
          node.ruleName = ruleName
          node.rule = rule
          return node
        }
      }
    }
  }

  parseTagNode(element){
    var node
    let elTag = element.tagName.toLowerCase()
    for(var ruleName in rules.tagRules){
      let rule = rules.tagRules[ruleName]
      rule.tags = rule.tags ? rule.tags : [ruleName]
      for(var i = 0; i < rule.tags.length; i++){
        let tag = rule.tags[i]
        if(elTag === tag.toLowerCase()){
          node = new TagNode(tag)
          node.setLabel(rule.label ? rule.label : ruleName)
          node.ruleName = ruleName
          node.rule = rule
          return node
        }
      }
    }
    node = new TagNode(elTag)
    node.ruleName = elTag
    node.rule = Object.assign({}, commonRule)
    return node
  }

  copyClassList(from, to){
    from.forEach(cssClass=>{
      if(cssClass.indexOf('rx-_-') !== 0){
        to.push(cssClass)
      }
    })
  }

}