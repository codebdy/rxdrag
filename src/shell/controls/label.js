import {RXComponent} from "../../basic/rxcomponent"
export class OpLabel extends RXComponent{
  constructor(labelText){
    super()
    this.cssClass('op-label')

    this.textSpan = new RXComponent('span')
    this.textSpan.innerHTML = labelText
    this.pushChild(this.textSpan)
  }

  setRightIcon(innerHTML){
    let iconSpan = new RXComponent('span')
    iconSpan.cssClass('right-icon')
    iconSpan.innerHTML = innerHTML
    this.pushChild(iconSpan)
    return this
  }

  setText(text){
    this.textSpan.setInnerHTML(text)
  }

}