import {RXElement} from "../../rxelement"
import {HTMLTable} from "../../html/html-table"
import {HTMLThead} from "../../html/html-thead"
import {HTMLTbody} from "../../html/html-tbody"
import {HTMLTh} from "../../html/html-th"
import {HTMLTr} from "../../html/html-tr"
import {HTMLTd} from "../../html/html-td"
import {HTMLCaption} from "../../html/html-caption"

//import {addonTypyListInline} from "../schemas/content/list-inline"

export class BSTable extends HTMLTable{
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
  }

  make(){
    return new BSTable
  }

  metaToModel(model){
    model.classList.push(this.$meta.baseClass)
    //model.classList.push('table-success')
    //model.classList.push('table-striped')
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
