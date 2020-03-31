import {CharNode} from "./char-node"

export class TextNode{
  constructor(text) {
  	this.text = text
    this.seedId()
    this.isTextNode = true
	}
  seedId(){
    if(!TextNode.idSeed) TextNode.idSeed = 1
    TextNode.idSeed ++
    this.id = "text" + TextNode.idSeed
  }

  make(){
    return new TextNode(this.text)
  }

  clone(){
    let copy = this.make()
    return copy
  }

  getParentViewDomElement(){
    return this.parent.view.$dom
  }

  render(){
    //this.view.render(this.toViewModel(), this.getParentViewDomElement())
    let parentDom = this.getParentViewDomElement()
    if(parentDom){
    	parentDom.appendChild(document.createTextNode(this.text))
    }
  }

  renderHtml(parentDomElement){
    if(parentDomElement){
      parentDomElement.appendChild(document.createTextNode(this.text))
    }
  }


  renderMouseFollower(parentDomElement){
    let mouseFollower = document.createTextNode(this.text)
    parentDomElement.appendChild(mouseFollower)
    return mouseFollower
  }

  preview(){}

  nodeChanged(){}

  refreshState(){}

  clearDraggedoverStates(){}

  clearActiveStates(){}

  clearFocusAndEditStates(){}

  clearCharNodes(){}
  
  draggedToFoused(){}

  focusNode(){}

  allToNormalState(){}

  toTreeViewNode(){
    return null
  }

  getNodeById(){}

  charNodes(){
    let nodes = []
    for(var i = 0; i < this.text.length; i++){
      nodes.push(new CharNode(this.text[i], this.parent))
    }
    return nodes
  }
}