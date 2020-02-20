import {OptionFragment} from "../option-fragment"

class TypyBlockquote extends OptionFragment{
  constructor(){
    super()
    this.schema = {
      label:'Blockquote',
      widget:'OpSwitch',
      required:true,
      group:'typographyOptions',
      onValue:'blockquote',
      offValue:'',
      defaultValue:'',
    }

    this.metaFragment = '' 

    this.fieldName = 'typyBlockquote'
  }

  copyMeta(from, to){
    to[this.fieldName] = from[this.fieldName]
  }

  metaToModel(model, meta){
    let metaFragment = meta[this.fieldName]
    model.classList.add(metaFragment)
  }
}

var addonTypyBlockquote = (node, groupName)=>{
  let typyBlockquote = new TypyBlockquote
  typyBlockquote.addon(node, groupName)
  return typyBlockquote
}

export {addonTypyBlockquote}

