import {RXElement} from "../../rxelement"
import {HTMLThead} from "../../html/htmlthead"
import {HTMLTbody} from "../../html/htmltbody"
import {HTMLTh} from "../../html/htmlth"
import {HTMLTr} from "../../html/htmltr"
import {HTMLTd} from "../../html/htmltd"
import {HTMLCaption} from "../../html/htmlcaption"

//import {addonTypyListInline} from "../schemas/content/list-inline"

export class BSTable extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupContent'
    this.toolboxInfo.elementId = 'htmlTable'
    this.toolboxInfo.elementName = "Table"
    this.className = 'BSTable'

    //this.editMarginStyle.padding = '20px;'
    this.editMarginStyle.padding = ''

    //this.groups.paragraphOptions = {
    //  label:'Paragraph Options'
    //}
    this.$meta.tag = 'table'
    this.$meta.baseClass = 'table' 

    this.label = "table"
    this.acceptedChildren=[]
  }

  make(){
    return new BSTable
  }

  metaToModel(model){
    model.classList.push(this.$meta.baseClass)
  }

  loadConfig(){
    this.pushChild(new HTMLCaption()
      .setInnerHTML("List of users")
      .setField('generalTextfield', 'contentEditable')
    )
    let head = new HTMLThead
    head.pushChild(
      new HTMLTr()
      .pushChild(new HTMLTh()
        .setInnerHTML("#")
        .setField('generalTextfield', 'contentEditable')
      )
      .pushChild(new HTMLTh()
        .setInnerHTML("First")
        .setField('generalTextfield', 'contentEditable')
      )
      .pushChild(new HTMLTh()
        .setInnerHTML("Last")
        .setField('generalTextfield', 'contentEditable')
      )
      .pushChild(new HTMLTh()
        .setInnerHTML("Handle")
        .setField('generalTextfield', 'contentEditable')
      )
    )
    this.pushChild(head)
    let body = new HTMLTbody
    body.pushChild(
      new HTMLTr()
      .pushChild(new HTMLTh()
        .setInnerHTML("1")
        .setField('generalTextfield', 'contentEditable')
      )
      .pushChild(new HTMLTd()
        .setInnerHTML("Mark")
        .setField('generalTextfield', 'contentEditable')
      )
      .pushChild(new HTMLTd()
        .setInnerHTML("Otto")
        .setField('generalTextfield', 'contentEditable')
      )
      .pushChild(new HTMLTd()
        .setInnerHTML("@mdo")
        .setField('generalTextfield', 'contentEditable')
      )
    )
    body.pushChild(
      new HTMLTr()
      .pushChild(new HTMLTh()
        .setInnerHTML("2")
        .setField('generalTextfield', 'contentEditable')
      )
      .pushChild(new HTMLTd()
        .setInnerHTML("Jacob")
        .setField('generalTextfield', 'contentEditable')
      )
      .pushChild(new HTMLTd()
        .setInnerHTML("Thornton")
        .setField('generalTextfield', 'contentEditable')
      )
      .pushChild(new HTMLTd()
        .setInnerHTML("@fat")
        .setField('generalTextfield', 'contentEditable')
      )
    )
    body.pushChild(
      new HTMLTr()
      .pushChild(new HTMLTh()
        .setInnerHTML("3")
        .setField('generalTextfield', 'contentEditable')
      )
      .pushChild(new HTMLTd()
        .setInnerHTML("Larry")
        .setField('generalTextfield', 'contentEditable')
      )
      .pushChild(new HTMLTd()
        .setInnerHTML("the Bird ")
        .setField('generalTextfield', 'contentEditable')
      )
      .pushChild(new HTMLTd()
        .setInnerHTML("@twitter")
        .setField('generalTextfield', 'contentEditable')
      )
    )

    this.pushChild(body)
    return this
  }

}
