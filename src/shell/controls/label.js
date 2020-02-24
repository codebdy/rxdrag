import {RXComponent} from "../../basic/rxcomponent"
import {OpIconButton} from "./buttons"
import {OpInput} from "./input"
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

export class OpLabelGroup extends OpInput{
  constructor(){
    super()
    this.cssClass('op-label-group')
    this.value = new RXArray
    this.onRemoveValue = (value)=>{}
    this.addLabels()
    this.checkEmperty()
  }

  addLabel(value){
    if(!value) return
    this.value.add(value)
    let label = new OpLabel(value).setRightIcon('×')
    label.rightIconClick = (labelText)=>{
      this.removeLabel(labelText)
      this.onRemoveValue(labelText)
    }
    this.pushChild(label)
  }

  addLabels(){
    this.clearChild()
    this.value.forEach((value)=>{
      this.addLabel(value)
    })
  }

  checkEmperty(){
    if(this.value.length === 0){
      this.setInnerHTML('<div class="not-set-value">NOT SET</div>')
    }
    else{
      this.setInnerHTML('')
    }
  }

  setValues(value){
    this.clearChild()
    this.value.length = 0
    value.forEach((value)=>{
      this.addLabel(value)
    })
    this.checkEmperty()
    this.refresh()
  }

  removeLabel(labelText){
    this.value.remove(labelText)
    this.checkEmperty()
    this.addLabels()
    this.refresh()
  }
}

export class OpLabelsInput extends OpInput{
  constructor(value, schema){
    super(value, schema.defaultValue)
    this.cssClass('op-labels-input')
    this.value = new RXArray
    this.value.push.apply(this.value, value)
    //this.value.push('test1')
    //this.value.push('test2')
    //this.value.push('col-md-xx')
    this.labelGroup = new RXComponent().cssClass('op-label-group').show()
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
              this.value.add(newValue)
            }
          })
          this.onValueChanged(this.value)
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
    this.value.forEach((value)=>{
      let label = new OpLabel(value).setRightIcon('×')
      label.rightIconClick = (labelText)=>{
        this.removeLabel(labelText)
      }
      this.labelGroup.pushChild(label)
    })
  }

  removeLabel(labelText){
    this.value.remove(labelText)
    this.addLabels()
    this.labelGroup.refresh()
    this.onValueChanged(this.value)
  }

  isShowingDefault(){
    return this.defaultValue.sort().toString() === this.value.sort().toString()
  }

}

