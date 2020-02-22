import {RXTextfieldable} from "./textfieldable"
import {addonFigureCaption} from "../schemas/figure/figure-caption"

export class HTMLFigcaption extends RXTextfieldable{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlFigcaption'
    this.toolboxInfo.elementName = "Figcaption"
    this.className = 'HTMLFigcaption'

    this.editMarginStyle.padding = '10px'
    //this.editMarginStyle = {}

    this.groups.figureOptions = {
      label:'Figure Options'
    }
    this.$meta.tag = 'figcaption'
    this.label = "figcaption"
    this.acceptedChildren=''
    this.rejectChildren = ['BSCol','BSW100','HTMLThead', 'HTMLTBody', 
                           'HTMLTh', 'HTMLTr', 'HTMLTd']

    addonFigureCaption(this)
  }

  make(){
    return new HTMLFigcaption
  }

}
