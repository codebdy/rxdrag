import {RXComponent} from "../../basic/rxcomponent"
import {OpIconButton} from "./buttons"
import {OpInput} from "./input"
import {OpTextField} from "./textfield"
import {RXArray} from "../../basic/rxarray"

class OpNameValuePair extends RXComponent{
  constructor(name, value){
    super()
    this.name = name
    this.value = value
    this.seedId()
    this.onValueChanged = (pair)=>{}
    this.onDeleted = (pair)=>{}
    let deleteButton = new OpIconButton('×')
                       .domOn('click',()=>{
                          this.$dom.parentElement.removeChild(this.$dom)
                          this.onDeleted(this)
                       })
    let nameField = new RXComponent('input')
                    .cssClass("ctl-textfield")
                    .domAttr('value', this.name)
                    .domOn('blur',()=>{
                      let value = nameField.$dom.value
                      if(value !== this.name){
                        this.name = value
                        this.onValueChanged(this)
                      }
                    })

    let valueField = new RXComponent('input')
                     .cssClass("ctl-textfield")
                     .domAttr('value', this.value)
                     .domOn('blur',()=>{
                        let value = valueField.$dom.value
                        if(value !== this.value){
                          this.value = value
                          this.onValueChanged(this.name, this.value)
                       }
                     })

    this.cssClass('op-name-value-pair')
        .pushChild(
          new RXComponent()
          .cssStyle('flex', '1')
          .pushChild(nameField)
        )
        .pushChild(
          new RXComponent('span').setInnerHTML(':').cssStyle('padding', '2px')
        )
        .pushChild(
          new RXComponent()
          .cssStyle('flex', '1')
          .pushChild(valueField)
        )
        .pushChild(deleteButton)
  }

  seedId(){
    if(!OpNameValuePair.idSeed) OpNameValuePair.idSeed = 1
    OpNameValuePair.idSeed ++
    this.id = OpNameValuePair.idSeed
  }

}

export class OpNameValueInput extends OpInput{
  constructor(value, schema){
    super(value, schema.defaultValue)
    this.cssClass('op-name-value-input')
    this.pairs = new RXArray
    this.addButton = new OpIconButton('+')
    this.pushChild(this.addButton)

    //this.addLabels()

    this.addButton.domOn('click', ()=>{
      this.addOnePair('', '')
      this.refresh()
    })
  }

  addOnePair(name, value){
    let nvPair = new OpNameValuePair(name, value)
    nvPair.onDeleted = (pair)=>{
      this.children.remove(pair)
    }
    this.insertBefore(nvPair, this.addButton)
  }

  isShowingDefault(){
    return this.isObjectValueEqual(this.defaultValue, this.value)
  }

  isObjectValueEqual(a, b) {
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    if (aProps.length != bProps.length) {
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];
        var propA = a[propName];
        var propB = b[propName];
        if ( propA !== propB) {
          return false;
        }
    }
    return true;
  }
}
