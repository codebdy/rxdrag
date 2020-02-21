import {RXElement} from "../../rxelement"
import {HTMLFigure} from "../../html/htmlfigure"
import {HTMLFigcaption} from "../../html/htmlfigcaption"
import {HTMLImg} from "../../html/htmlimg"
//import {addonTypyListInline} from "../schemas/content/list-inline"

export class BSFigure extends HTMLFigure{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupContent'
    this.toolboxInfo.elementId = 'htmlFigure'
    this.toolboxInfo.elementName = "Figure"
    this.className = 'BSFigure'

    //this.editMarginStyle.padding = '20px;'
    this.editMarginStyle.padding = '10px'

    //this.groups.paragraphOptions = {
    //  label:'Paragraph Options'
    //}
    this.$meta.tag = 'figure'
    //this.$meta.baseClass = 'figure' 

    this.label = "figure"
  }

  make(){
    return new BSFigure
  }

  metaToModel(model){
    //model.classList.push(this.$meta.baseClass)
    //model.classList.push('figure-success')
    //model.classList.push('figure-striped')
  }

  loadConfig(){
    let img = new HTMLImg
    img.$meta.figureImg = 'figure-img'
    img.setField('imageSrc', 'https://picsum.photos/200')
    this.pushChild(img)

    let caption = new HTMLFigcaption().setInnerHTML("A caption for the above image.")
        .setField('generalTextfield', 'contentEditable')
    this.pushChild(caption)
    return this
  }

}
