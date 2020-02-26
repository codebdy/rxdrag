import {RXComponent} from "../../basic/rxcomponent"
import {OpLabel} from "./label"
import {OpIconButton} from "./buttons"
import {OpClassInput} from "./class-input"

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


export class OpSelect extends OpClassInput{
  constructor(value, schema){
    super(value, schema.defaultValue)
    this.list = schema.list
    if(schema.columns === 2){
      this.cssClass('two-column')
    }
    //console.log(value)
    let selfValue = this.getSelfValue()

    this.cssClass('ctl-select')

    this.valueViewer = new OpLabel()

    this.emptyValue = 'Default'
    if(!schema.required){
      this.clearBtn = new OpIconButton('×')
      this.pushChild(this.clearBtn)
      this.clearBtn.domOn('click', ()=>{
        this.clear()
      })
    }
    this.pushChild(this.valueViewer)

    this.listViewer = new SelectedList(this.list, schema.required)
    this.valueViewer.setText(selfValue ? this.list[selfValue] : this.emptyValue)
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
      let oldValue = this.getSelfValue()
      this.setSelfValue(id)

      if(oldValue !== id){
        this.onValueChanged(this.value)
      }
      this.valueViewer.setText(text)
      this.listViewer.hide()
    }

  }

  listValues(){
    let values = []
    for(var value in this.list){
      values.push(value)
    }
    return values
  }

  getSelfValue(){
    let sAllValue = new Set(this.listValues())
    let intersect = this.value.filter(x => sAllValue.has(x))
    if(intersect.length > 0){
      return intersect[0]
    }
    return ''
  }

  setSelfValue(value){
    this.removeSelfValue()
    this.value = Array.from(new Set([...this.value, value]))
  }

  removeValue(){
    this.valueViewer.setText(this.emptyValue)
    let oldValue = this.getSelfValue()
    this.removeSelfValue()
    if(oldValue){
      this.onValueChanged(this.value)
    }
  }

  clear(){
    this.removeValue()
  }

  isShowingDefault(){
    return this.defaultValue == this.getSelfValue()
  }

}