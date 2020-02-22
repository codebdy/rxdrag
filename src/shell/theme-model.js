import {RXModel} from "./controls/model"
import {RXComponent} from "../basic/rxcomponent"

class ThemeItem extends RXComponent{
  constructor(){
    super('button')
    this.cssClass('theme-item')
  }
}

export class ThemeModel extends RXModel{
  constructor(){
    super()
    this.conentShell = new RXComponent()
                       .cssClass('model-content-shell')

    this.addContentChild(this.conentShell)

    this.onThemeSelected = (theme)=>{}

    let bootStrap = new ThemeItem
    bootStrap.setInnerHTML('None')
             .domOn('click',()=>{
              this.onThemeSelected('base')
              this.hide()
             })
    this.conentShell.pushChild(bootStrap)

    let agency = new ThemeItem
    agency.setInnerHTML('Agency')
          .domOn('click',()=>{
              this.onThemeSelected('agency')
              this.hide()
            this.hide()
          })
    this.conentShell.pushChild(agency)

  }
}