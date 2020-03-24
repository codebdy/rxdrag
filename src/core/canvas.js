import {Node} from "./node"

export class Canvas extends Node{
  constructor(workspace) {
    super()
    this.activeState = this.normalState
    this.focusState = this.normalState
    this.parentViewDomElement = workspace;
    this.padding = '30px';

    this.stateChanged = (oldState, newState)=>{}

    this.rule = {dropInMargin : 10}
    this.rule.heightDropMargin = 0
    this.rule.widthDropMargin = 0
    this.rule.dropMargin = 0;
    this.rule.acceptedChildren=''
    this.rule.rejectChildren = ['col','w100','thead', 'tbody', 
                           'th', 'tr', 'td']
  }

  getParentViewDomElement(){
    return this.parentViewDomElement
  }

  toViewModel(){
    let model = super.toViewModel()
    model.tag = 'div'
    model.styles.width = "100%"
    model.styles['min-height'] = "calc(100vh)"
    model.styles.cursor = 'default'
    model.styles['border'] = '0'
    model.styles['padding-bottom'] = '40px'
    //model.styles['background'] = '#8cdb27'
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

  generateTreeViewNodes(){
    let viewNodes = []
    this.children.forEach((child)=>{
      viewNodes.push(child.toTreeViewNode())
    })
    return viewNodes
  }
}

