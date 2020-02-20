import {OptionFragment} from "../option-fragment"

class TypyBlockquoteFooter extends OptionFragment{
  constructor(){
    super()
    this.schema = {
      label:'BlockquoteFooter',
      widget:'OpSwitch',
      required:true,
      group:'typographyOptions',
      onValue:'blockquote-footer',
      offValue:'',
      defaultValue:'',
    }

    this.metaFragment = '' 

    this.fieldName = 'typyBlockquoteFooter'
  }

  copyMeta(from, to){
    to[this.fieldName] = from[this.fieldName]
  }

  metaToModel(model, meta){
    let metaFragment = meta[this.fieldName]
    model.classList.add(metaFragment)
  }
}

var addonTypyBlockquoteFooter = (node, groupName)=>{
  let typyBlockquoteFooter = new TypyBlockquoteFooter
  typyBlockquoteFooter.addon(node, groupName)
  return typyBlockquoteFooter
}

export {addonTypyBlockquoteFooter}

