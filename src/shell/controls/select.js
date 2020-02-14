import {RXComponent} from "../../basic/rxcomponent"
import {OpLabel} from "./label"
import {OpIconButton} from "./buttons"
import {OpInput} from "./input"

class SelectItem extends RXComponent{
  constructor(id, value){
    super('li')
    this.id = id
    this.value = value
    this.setInnerHTML(value)
    this.selected = (id, value)=>{}
    this.domOn('click', ()=>{
      this.selected(this.id, this.value)
    })      
  }
}

class SlectedList  extends RXComponent{
  constructor(list = {}){
    super('ul')
    this.cssClass('select-list')
    this.list = list
    this.valueChage = (id, text)=>{}

    for(var id in list){
      var li = new SelectItem(id, list[id])
      li.selected =  (id, value)=>{
        this.valueChage(id, value)
      }
      this.pushChild(li)
    }
  }


}

export class OpSelect extends OpInput{
  constructor(list, fieldName ,value = '', required = false){
    super(value, fieldName)
    this.cssClass('ctl-select')
    //this.fieldName = fieldName
    //this.value = value
    this.valueViewer = new OpLabel()
    //this.valueChanged = (value, fieldName)=>{}
    var emptyValue = '-Select-'
    if(!required){
      this.clearBtn = new OpIconButton('×')
      this.pushChild(this.clearBtn)
      this.clearBtn.domOn('click', ()=>{
        this.valueViewer.setText(emptyValue)
        if(this.value){
          this.onValueChanged('', this.fieldName)
        }
        this.value = ''
      })
    }
    this.pushChild(this.valueViewer)

    this.listViewer = new SlectedList(list, required)
    this.valueViewer.setText(value?list[value]:emptyValue)
    this.valueViewer.setRightIcon('▾')
    this.pushChild(this.listViewer)

    this.valueViewer.domOn('click',(event)=>{
      this.listViewer.show()
      event.stopPropagation()
    })

    document.addEventListener('mousedown', ()=>{
      this.listViewer.hide()
    })

    this.listViewer.domOn('mousedown',(event)=>{
      event.stopPropagation()
    })

    this.listViewer.valueChage = (id, value)=>{
      //console.log(id, text)
      if(id !== this.value){
        this.onValueChanged(id, this.fieldName)
      }
      this.value = id
      this.valueViewer.setText(value)
      this.listViewer.hide()
    }

  }


}