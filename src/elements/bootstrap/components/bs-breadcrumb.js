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
  }

  make(){
    return new BSBreadcrumb
  }

  metaToModel(model){
    model.classList.push(this.$meta.baseClass)
    model.attributes['aria-label'] = 'breadcrumb'
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
          .setField('aHref',"#")
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
          .setField('aHref',"#")
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
