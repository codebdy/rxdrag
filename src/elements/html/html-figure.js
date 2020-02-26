import {RXElement} from "../rxelement"
import {addonUtilBorder} from "../schemas/utilities/border"
import {addonUtilPadding} from "../schemas/utilities/padding"
import {addonUtilMargin} from "../schemas/utilities/margin"
import {addonFigure} from "../schemas/figure/figure"


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

    this.$meta.tag = 'figure'
    this.label = "figure"

    /*addonFigure(this)
    addonUtilBorder(this)
    addonUtilMargin(this)
    addonUtilPadding(this)*/
  }

  make(){
    return new HTMLFigure
  }
}
