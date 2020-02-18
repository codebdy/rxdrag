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

class SelectedList  extends RXComponent{
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
  constructor(value, schema){
    super(value)
    if(schema.columns === 2){
      this.cssClass('two-column')
    }
    this.cssClass('ctl-select')
    let list = schema.list
    //this.fieldName = fieldName
    //this.value = value
    this.valueViewer = new OpLabel()
    //this.valueChanged = (value, fieldName)=>{}
    this.emptyValue = 'Default'
    if(!schema.required){
      this.clearBtn = new OpIconButton('×')
      this.pushChild(this.clearBtn)
      this.clearBtn.domOn('click', ()=>{
        this.clear()
      })
    }
    this.pushChild(this.valueViewer)

    this.listViewer = new SelectedList(list, schema.required)
    this.valueViewer.setText(value?list[value]:this.emptyValue)
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

    this.listViewer.valueChage = (id, text)=>{
      let oldValue = this.value
      this.value = id
      //console.log(id, text)
      if(oldValue !== this.value){
        this.onValueChanged(id)
      }
      this.valueViewer.setText(text)
      this.listViewer.hide()
    }

  }

  removeValue(){
    this.valueViewer.setText(this.emptyValue)
    let oldValue = this.value
    this.value = ''
    if(oldValue){
      this.onValueChanged(this.value)
    }
  }


  clear(){
    this.removeValue()
  }


}