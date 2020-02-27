import {RXElement} from "../rxelement"


export class HTMLFigure extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlFigure'
    this.toolboxInfo.elementName = "Figure"
    this.className = 'HTMLFigure'


    this.acceptedChildren=['HTMLFigcaption', 'HTMLImg']

    this.unshiftGroup({
      id:'figureOptions',
      label:'Figure Options',
    })

    this.meta.tag = 'figure'
    this.label = "figure"

  }

  make(){
    return new HTMLFigure
  }
}
