import {RXComponent} from "../../basic/rxcomponent"
import {OpIconButton} from "./buttons"
import {RXArray} from "../../basic/rxarray"

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

export class OpLabelsInput extends RXComponent{
  constructor(labelText){
    super()
    this.cssClass('op-labels-input')
    this.values = new RXArray
    this.values.push('test1')
    this.values.push('test2')
    this.values.push('col-md-xx')
    this.labelGroup = new RXComponent().cssClass('op-label-group')
    this.pushChild(this.labelGroup)
    this.addButton = new OpIconButton('+')
    this.pushChild(this.addButton)

    this.inputCtrl = new RXComponent('input')
    this.inputWraper = new RXComponent()
                      .cssClass('label-input')
                      .pushChild(this.inputCtrl)
    this.inputWraper.hide()
    this.pushChild( this.inputWraper)

    this.showLabels()

    this.addButton.domOn('onclick', ()=>{
      this.inputWraper.show()
      this.inputCtrl.focus()
    })

    document.addEventListener('mousedown', ()=>{
        this.hideInput()
    })

    this.inputWraper.domOn('onmousedown',(event)=>{
      event.stopPropagation()
    })

    this.inputWraper.domOn('onkeyup',(event)=>{
      if (event.keyCode == 13) {
        if(this.inputCtrl.value){
          this.values.push(this.inputCtrl.value)
          
        }
        this.hideInput()
      }
    })

    this.hideInput = ()=>{
      this.inputWraper.hide()
      this.inputCtrl.clear()
    }

  }

  showLabels(){
    this.values.forEach((value)=>{
      this.labelGroup.pushChild(new OpLabel(value).setRightIcon('×'))
    })
  }
}