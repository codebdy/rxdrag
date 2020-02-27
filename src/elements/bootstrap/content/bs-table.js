import {RXElement} from "../../rxelement"
import {HTMLTable} from "../../html/html-table"
import {HTMLThead} from "../../html/html-thead"
import {HTMLTbody} from "../../html/html-tbody"
import {HTMLTh} from "../../html/html-th"
import {HTMLTr} from "../../html/html-tr"
import {HTMLTd} from "../../html/html-td"
import {HTMLCaption} from "../../html/html-caption"

export class BSTable extends HTMLTable{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupContent'
    this.toolboxInfo.elementId = 'htmlTable'
    this.toolboxInfo.elementName = "Table"
    this.className = 'BSTable'

    //this.editMarginStyle.padding = '20px;'
    this.editMarginStyle.padding = ''

    this.addClass('table')
    this.label = "table"
  }

  make(){
    return new BSTable
  }

  loadConfig(){
    this.pushChild(new HTMLCaption()
      .setInnerHTML("List of users")
      .becomeToTextfield()
    )
    let head = new HTMLThead
    head.pushChild(
      new HTMLTr()
      .pushChild(new HTMLTh()
        .setInnerHTML("#")
        .becomeToTextfield()
      )
      .pushChild(new HTMLTh()
        .setInnerHTML("First")
        .becomeToTextfield()
      )
      .pushChild(new HTMLTh()
        .setInnerHTML("Last")
        .becomeToTextfield()
      )
      .pushChild(new HTMLTh()
        .setInnerHTML("Handle")
        .becomeToTextfield()
      )
    )
    this.pushChild(head)
    let body = new HTMLTbody
    body.pushChild(
      new HTMLTr()
      .pushChild(new HTMLTh()
        .setInnerHTML("1")
        .becomeToTextfield()
      )
      .pushChild(new HTMLTd()
        .setInnerHTML("Mark")
        .becomeToTextfield()
      )
      .pushChild(new HTMLTd()
        .setInnerHTML("Otto")
        .becomeToTextfield()
      )
      .pushChild(new HTMLTd()
        .setInnerHTML("@mdo")
        .becomeToTextfield()
      )
    )
    body.pushChild(
      new HTMLTr()
      .pushChild(new HTMLTh()
        .setInnerHTML("2")
        .becomeToTextfield()
      )
      .pushChild(new HTMLTd()
        .setInnerHTML("Jacob")
        .becomeToTextfield()
      )
      .pushChild(new HTMLTd()
        .setInnerHTML("Thornton")
        .becomeToTextfield()
      )
      .pushChild(new HTMLTd()
        .setInnerHTML("@fat")
        .becomeToTextfield()
      )
    )
    body.pushChild(
      new HTMLTr()
      .pushChild(new HTMLTh()
        .setInnerHTML("3")
        .becomeToTextfield()
      )
      .pushChild(new HTMLTd()
        .setInnerHTML("Larry")
        .becomeToTextfield()
      )
      .pushChild(new HTMLTd()
        .setInnerHTML("the Bird ")
        .becomeToTextfield()
      )
      .pushChild(new HTMLTd()
        .setInnerHTML("@twitter")
        .becomeToTextfield()
      )
    )

    this.pushChild(body)
    return this
  }

}
