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
    this.labelText = labelText
    this.rightIconClick = (labelText)=>{}
  }

  setRightIcon(innerHTML){
    let iconSpan = new RXComponent('span')
    iconSpan.cssClass('right-icon')
    iconSpan.innerHTML = innerHTML
    this.pushChild(iconSpan)
    iconSpan.domOn('click', ()=>{
      this.rightIconClick(this.labelText)
    })
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
    this.pushChild(
        new RXComponent().pushChild(this.labelGroup)
      )
    this.addButton = new OpIconButton('+')
    this.pushChild(this.addButton)

    this.inputCtrl = new RXComponent('input')
    this.inputWraper = new RXComponent()
                      .cssClass('label-input')
                      .pushChild(this.inputCtrl)
    this.inputWraper.hide()
    this.pushChild( this.inputWraper)

    this.addLabels()

    this.addButton.domOn('click', ()=>{
      this.inputWraper.show()
      this.inputCtrl.focus()
    })

    document.addEventListener('mousedown', ()=>{
      this.hideInput()
    })

    this.inputWraper.domOn('mousedown',(event)=>{
      event.stopPropagation()
    })

    this.inputWraper.domOn('keyup',(event)=>{
      if (event.keyCode == 13) {
        let value = this.inputCtrl.$dom.value
        if(value){
          value.split(' ').forEach((newValue)=>{
            if(newValue){
              this.values.add(newValue)
            }
          })
          this.addLabels()
          this.labelGroup.refresh()
        }
        this.hideInput()
      }
    })

    this.hideInput = ()=>{
      this.inputWraper.hide()
      this.inputCtrl.clear()
    }

  }


  addLabels(){
    this.labelGroup.clearChild()
    this.values.forEach((value)=>{
      let label = new OpLabel(value).setRightIcon('×')
      label.rightIconClick = (labelText)=>{
        this.removeLabel(labelText)
      }
      this.labelGroup.pushChild(label)
    })
  }

  removeLabel(labelText){
    this.values.remove(labelText)
    this.addLabels()
    this.labelGroup.refresh()
  }
}