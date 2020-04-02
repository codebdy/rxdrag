import {Node} from "./node"

export class Canvas extends Node{
  constructor(workspace) {
    super()
    this.activeState = this.normalState
    this.focusState = this.normalState
    this.parentViewDomElement = workspace;
    this.padding = '30px';

    this.stateChanged = (oldState, newState)=>{}

    this.rule = {dropInMargin : 0}
    this.rule.acceptedChildren=''
    this.rule.rejectChildren = ['col','thead', 'tbody', 
                           'th', 'tr', 'td']
  }

  getParentViewDomElement(){
    return this.parentViewDomElement
  }

  /*preview(parentDomElement){
    if(parentDomElement.contains(this.view.$dom)){
      parentDomElement.removeChild(this.view.$dom)
    }
    return super.preview(parentDomElement)
  }*/

  toViewModel(){
    let model = super.toViewModel()
    model.tag = 'div'
    model.styles.width = "100%"
    model.styles['min-height'] = "calc(100vh)"
    model.styles.cursor = 'default'
    model.styles['border'] = '0'
    model.styles['padding'] = '10px'
    model.classList.push('canvas')
    model.toolbar = ''
    model.label = ''
   return model
  }

  toPreviewModel(){
    let model = super.toPreviewModel()
    model.tag = 'div'
    return model
  }

  generateHTML(){
    let rootDiv = document.createElement('div')
    this.children.forEach(child=>{
      child.renderHtml(rootDiv)
    })
    return rootDiv.innerHTML

  }

  generateJson(){
    let jsonArray = []
    this.children.forEach((child)=>{
      jsonArray.push(child.toJson())
    })
    return jsonArray
  }

  generateTreeViewNodes(){
    let viewNodes = []
    this.children.forEach((child)=>{
      viewNodes.push(child.toTreeViewNode())
    })
    return viewNodes
  }
}

