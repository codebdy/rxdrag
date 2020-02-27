import {RXElement} from "../rxelement"
import {addonFigureCaption} from "../schemas/figure/figure-caption"

export class HTMLFigcaption extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlFigcaption'
    this.toolboxInfo.elementName = "Figcaption"
    this.className = 'HTMLFigcaption'

    this.editMarginStyle.padding = '10px'
    //this.editMarginStyle = {}

    this.unshiftGroup({
      id:'figureOptions',
      label:'Figure Options',
    })

    this.meta.tag = 'figcaption'
    this.label = "figcaption"
    this.acceptedChildren=''
    this.rejectChildren = ['BSCol','BSW100','HTMLThead', 'HTMLTBody', 
                           'HTMLTh', 'HTMLTr', 'HTMLTd']

    this.becomeToTextfield()
    //addonFigureCaption(this)
  }

  make(){
    return new HTMLFigcaption
  }

}
