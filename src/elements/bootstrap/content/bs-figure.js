import {RXElement} from "../../rxelement"
import {HTMLFigure} from "../../html/html-figure"
import {HTMLFigcaption} from "../../html/html-figcaption"
import {HTMLImg} from "../../html/html-img"

export class BSFigure extends HTMLFigure{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupContent'
    this.toolboxInfo.elementId = 'htmlFigure'
    this.toolboxInfo.elementName = "Figure"
    this.className = 'BSFigure'

    //this.editMarginStyle.padding = '20px;'
    this.editMarginStyle.padding = '10px'

    this.meta.tag = 'figure'
    this.label = "figure"
    this.addClass('figure')
  }

  make(){
    return new BSFigure
  }

  loadConfig(){
    let img = new HTMLImg().addClass('figure-img')
    img.setAttribute('src', /*'https://picsum.photos/200'*/'images/1003-367x267.jpg')
    this.pushChild(img)

    let caption = new HTMLFigcaption().setInnerHTML("A caption for the above image.")
                  .addClass('figure-caption')
    this.pushChild(caption)
    return this
  }

}
