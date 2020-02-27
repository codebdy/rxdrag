import {HTMLNav} from "../../html/html-nav"
import {HTMLOl} from "../../html/html-ol"
import {HTMLLi} from "../../html/html-li"
import {HTMLA} from "../../html/html-a"

export class BSBreadcrumb extends HTMLNav{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupComponents'
    this.toolboxInfo.elementId = 'bsBreadcrumb'
    this.toolboxInfo.elementName = "Breadcrumb"
    this.className = 'BSBreadcrumb'

    this.editMarginStyle.padding = ''
    //this.editMarginStyle = {}
    this.label = 'breadcrumb'

    this.acceptedChildren=['HTMLLi']
    this.setAttribute('aria-label', 'breadcrumb')
  }

  make(){
    return new BSBreadcrumb
  }

  loadConfig(){
    this.pushChild(
      new HTMLOl()
      .addClass('breadcrumb')
      .setEditPadding('')
      .pushChild(
        new HTMLLi()
        .addClass('breadcrumb-item')
        .setEditPadding('')
        .pushChild(
          new HTMLA()
          .setAttribute('href',"#")
          .setInnerHTML('Home')
          .becomeToTextfield()
        )
      )
      .pushChild(
        new HTMLLi()
        .addClass('breadcrumb-item')
        .setEditPadding('')
        .pushChild(
          new HTMLA()
          .setAttribute('href',"#")
          .setInnerHTML('Library')
          .becomeToTextfield()
        )
      )
      .pushChild(
        new HTMLLi()
        .addClass('breadcrumb-item')
        .setEditPadding('')
        .becomeToTextfield()
        .addClass('active')
        .setAttribute('aria-current', 'page')
        .setInnerHTML('Data')
      )
    )
    //this.setField('badgeContextual', 'badge-primary')
    //this.setField('innerHTML', 'badge')
    return this
  }

}
