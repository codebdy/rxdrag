import {HTMLDiv} from "../../html/html-div"
import {HTMLH} from "../../html/html-h"

import {BSButton} from "./bs-button"
import {BSCard} from "./bs-card"
import {BSCardHeader} from "./bs-card-header"
import {BSCardBody} from "./bs-card-body"

export class BSAccordion extends HTMLDiv{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupComponents'
    this.toolboxInfo.elementId = 'bsAccordion'
    this.toolboxInfo.elementName = "Accordion"
    this.className = 'BSAccordion'

    //this.editMarginStyle.padding = '20px;'
    this.editMarginStyle.padding = '10px'

    this.acceptedChildren=''
    this.rejectChildren = ['BSCol','BSW100','HTMLThead', 'HTMLTBody', 
                           'HTMLTh', 'HTMLTr', 'HTMLTd']

    this.label = "accordion"
    this.addClass('accordion')
    this.setAttribute('id', 'accordion-' + this.id)
  }

  make(){
    return new BSAccordion
  }

  configSelf(){
    for(var i = 1; i <= 3; i++){
      this.pushChild(
        new BSCard()
        .pushChild(
          new BSCardHeader()
          .setAttribute('id', 'heading-' + i)
          .pushChild(
            new HTMLH()
            .addClass('mb-0')
            .pushChild(
              new BSButton()
              .addClass('btn-link')
              .setAttribute('type', 'button')
              .setAttribute('data-toggle', 'collapse')
              .setAttribute('data-target', '#collapse-' + i)
              .setAttribute('aria-expanded', 'true')
              .setAttribute('aria-controls', 'collapse-' + i)
              .setInnerHTML('Collapsible Group Item #' + i)
            )
          )
        )
        .pushChild(
          new HTMLDiv()
          .addClass('collapse')
          .addClass(i === 1 ? 'show' : '')
          .setAttribute('aria-labelledby', 'heading-' + i)
          .setAttribute('data-parent', '#accordion-' + this.id)
          .pushChild(
            new BSCardBody()
            .setInnerHTML(`Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.`)
          )
        )
      )
    }
  }

}
