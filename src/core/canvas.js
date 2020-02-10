import {Node} from "./node"

export class Canvas extends Node{
  constructor(workspace) {
    super()
    this.parentViewDomElement = workspace;
    this.acceptedChildren=''
    this.exceptChildren = ['BSCol']
    this.heightDropMargin = 0;
    this.widthDropMargin = 0;
    this.padding = '30px';
  }

  getParentViewDomElement(){
    return this.parentViewDomElement
  }

  toViewModel(){
    let model = super.toViewModel()
    model.styles.width = "100%"
    model.styles['min-height'] = "calc(100vh)"
    model.styles.cursor = 'default'
    model.classList.push('canvas')
    model.toolbar = ''
    model.label = ''
    return model
  }

}

