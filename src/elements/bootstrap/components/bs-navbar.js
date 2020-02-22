import {HTMLNav} from "../../html/html-nav"
import {HTMLOl} from "../../html/html-ol"
import {HTMLLi} from "../../html/html-li"
import {HTMLA} from "../../html/html-a"

export class BSNavbar extends HTMLNav{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupComponents'
    this.toolboxInfo.elementId = 'bsNavbar'
    this.toolboxInfo.elementName = "Navbar"
    this.className = 'BSNavbar'

    this.editMarginStyle.padding = ''
    //this.editMarginStyle = {}
    this.label = 'navbar'

    this.acceptedChildren=''
  }

  make(){
    return new BSNavbar
  }

  metaToModel(model){
    //model.classList.push(this.$meta.baseClass)
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
