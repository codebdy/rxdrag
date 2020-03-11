import {Node} from "./node"

export class Canvas extends Node{
  constructor(workspace) {
    super(workspace)
    this.activeState = this.normalState
    this.focusState = this.normalState
    this.parentViewDomElement = workspace;
    this.acceptedChildren=''
    this.rejectChildren = ['BSCol','BSW100','HTMLThead', 'HTMLTBody', 
                           'HTMLTh', 'HTMLTr', 'HTMLTd']
    this.heightDropMargin = 0;
    this.widthDropMargin = 0;
    this.dropMargin = 0;
    this.padding = '30px';

    this.stateChanged = (oldState, newState)=>{}

    this.$dom.style.width = "100%"
    this.$dom.style['min-height'] = "100vh"
    this.$dom.style['padding-bottom'] = "40px"
    this.$dom.style['border'] = "#313131 solid 2px"
    this.$dom.style['cursor'] = "default"
  }

  getParentViewDomElement(){
    return this.parentViewDomElement
  }

  /*toViewModel(){
    let model = super.toViewModel()
    model.name = 'div'
    model.styles.width = "100%"
    model.styles['min-height'] = "calc(100vh)"
    model.styles.cursor = 'default'
    model.styles['border'] = '#313131 solid 2px'
    model.styles['padding-bottom'] = '40px'
    //model.styles['padding-top'] = '25px'
    //model.styles['padding-right'] = '5px'
    model.classList.push('canvas')
    model.toolbar = ''
    model.label = ''
   return model
  }*/

  toPreviewModel(){
    let model = super.toPreviewModel()
    model.name = 'div'
    return model
  }

  setContent(html){
    this.$dom.innerHTML = html
    this.paraseNode(this.$dom)
  }

  paraseNode(element){
    for(var i = 0; i < element.children.length; i++){
      let child = element.children[i]
      let node = new Node(child)
      rxEditor.nodes.add(node)
      this.paraseNode(child)
    }
  }


  generateHTML(){
    let roorDiv = document.createElement('div')
    this.preview(roorDiv)

    //console.log(roorDiv.innerHTML)
    return roorDiv.innerHTML

  }

  generateTreeViewNodes(){
    let viewNodes = []
    this.children.forEach((child)=>{
      viewNodes.push(child.toTreeViewNode())
    })
    return viewNodes
  }
}

