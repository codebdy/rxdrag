import {Node} from "./node"

export class Canvas extends Node{
  constructor(workspace) {
    super()
    this.activeState = this.normalState
    this.focusState = this.normalState
    this.parentViewDomElement = workspace;
    this.acceptedChildren=''
    this.rejectChildren = ['BSCol','BSW100','HTMLThead', 'HTMLTBody', 
                           'HTMLTh', 'HTMLTr', 'HTMLTd']
    this.heightDropMargin = 0;
    this.widthDropMargin = 0;
    this.padding = '30px';

    this.stateChanged = (oldState, newState)=>{}
  }

  getParentViewDomElement(){
    return this.parentViewDomElement
  }

  toViewModel(){
    let model = super.toViewModel()
    model.name = 'div'
    model.styles.width = "100%"
    model.styles['min-height'] = "calc(100vh)"
    model.styles.cursor = 'default'
    model.styles['padding'] = '2px'
    model.styles['padding-bottom'] = '40px'
    //model.styles['padding-top'] = '25px'
    //model.styles['padding-right'] = '5px'
    model.classList.push('canvas')
    model.toolbar = ''
    model.label = ''
   return model
  }

  toPreviewModel(){
    let model = super.toPreviewModel()
    model.name = 'div'
    return model
  }

  generateHTML(){
    let roorDiv = document.createElement('div')
    this.preview(roorDiv)

    //console.log(roorDiv.innerHTML)
    return roorDiv.innerHTML

  }

  generateJson(){
    let jsonArray = []
    this.children.forEach((child)=>{
      jsonArray.push(child.toJson())
    })
    return jsonArray
  }
}

