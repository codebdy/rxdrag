import {OptionFragment} from "../option-fragment"

class TypyListUnstyled extends OptionFragment{
  constructor(){
    super()
    this.schema = {
      label:'List unstyled',
      widget:'OpSwitch',
      group:'typographyOptions',
      onValue:'list-unstyled',
      offValue:'',
      defaultValue:'',
    }

    this.metaFragment = '' 

    this.fieldName = 'typyListUnstyled'
  }

  copyMeta(from, to){
    to[this.fieldName] = from[this.fieldName]
  }

  metaToModel(model, meta){
    let metaFragment = meta[this.fieldName]
    model.classList.add(metaFragment)
  }
}

var addonTypyListUnstyled = (node, groupName)=>{
  let typyListUnstyled = new TypyListUnstyled
  typyListUnstyled.addon(node, groupName)
  return typyListUnstyled
}

export {addonTypyListUnstyled}

