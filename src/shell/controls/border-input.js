import {OpInput} from "./input"
import {OpButton, OpIconButton, ButtonGroup} from "./buttons"
import {RXComponent} from "../../basic/rxcomponent"

export class OpBorderInput extends OpInput{
  constructor(value, schema){
    super()
    this.cssClass('border-input')
    this.cssClass(schema.specialClass)

    this.schema = schema.list
    this.value = value
    this.defaultValue = schema.defaultValue

    let view = new RXComponent().cssClass('view')
    let topDiv = new RXComponent().setInnerHTML(`<div class="view-button top"></div>`)
    let rightDiv = new RXComponent().setInnerHTML(`<div class="view-button right"></div>`)
    let bottomDiv = new RXComponent().setInnerHTML(`<div class="view-button bottom"></div>`)
    let leftDiv = new RXComponent().setInnerHTML(`<div class="view-button left"></div>`)

    topDiv.domOn('click', ()=>{
      this.clickBorder('top')
    })
    rightDiv.domOn('click', ()=>{
      this.clickBorder('right')
    })
    bottomDiv.domOn('click', ()=>{
      this.clickBorder('bottom')
    })
    leftDiv.domOn('click', ()=>{
      this.clickBorder('left')
    })

    view.pushChild(topDiv)
             .pushChild(rightDiv)
             .pushChild(bottomDiv)
             .pushChild(leftDiv)

    this.pushChild(view)

    for(var fdName in this.schema){
      value.forEach((subVal)=>{
        if(this.schema[fdName] == subVal){
          this[fdName] = subVal
        }
      })
    }
    this.updateView()

  }

  clickBorder(border){
    if(this.all){
      this.top = this.schema['top']
      this.right = this.schema['right']
      this.bottom = this.schema['bottom']
      this.left = this.schema['left']
      this[border] = ''
      this.all = ''
    }
    else if(this[border]){
      this[border] = ''
    }
    else{
      this[border] = this.schema[border]
    }

    this.adjustValue()
    this.onValueChanged(this.value)
    this.updateView()
  }

  adjustValue(){
    this.value = []
    if(this.top && this.right && this.bottom && this.left){
      this.all = this.schema.all
      this.top = ''
      this.right = ''
      this.bottom = ''
      this.left = ''
      this.value.push(this.schema.all)
      return
    }

    for(var fdName in this.schema){
      if(this[fdName]){
        this.value.push(this.schema[fdName])
      }
    }
  }

  isShowingDefault(){
    return this.defaultValue.sort().toString() === this.value.sort().toString() 
  }

  updateView(){
    this.removeCssClass('select-all')
    this.removeCssClass('select-top')
    this.removeCssClass('select-right')
    this.removeCssClass('select-bottom')
    this.removeCssClass('select-left')

    if(this.all) {
      this.cssClass('select-all')
      return
    }

    if(this.top){
      this.cssClass('select-top')
    }
    if(this.right){
      this.cssClass('select-right')
    }
    if(this.bottom){
      this.cssClass('select-bottom')
    }
    if(this.left){
      this.cssClass('select-left')
    }
  }

  removeValue(value){
    if(this.all === value){
      this.all = ''
    }
    if(this.top === value){
      this.top = ''
    }
    if(this.right === value){
      this.right = ''
    }
    if(this.bottom === value){
      this.bottom = ''
    }
    if(this.left === value){
      this.left = ''
    }
    this.adjustValue()
    this.onValueChanged(this.value)
    this.updateView()
  }

  hasValue(value){
    for(var fdName in this.schema){
      if(this.schema[fdName] === value){
        return true
      }
    }
    return false
  }

}