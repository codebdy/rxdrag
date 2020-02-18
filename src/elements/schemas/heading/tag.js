import {OptionFragment} from "../option-fragment"

let headingTagSchema = {
  label:'Heading',
  group:'headingOptions',
  widget:'ButtonGroup',
  defaultValue:'',
  buttons:{
    'h1':'H1',
    'h2':'H2',
    'h3':'H3',
    'h4':'H4',
    'h5':'H5',
    'h6':'H6',
  },
}

class HeadingTag extends OptionFragment{
  constructor(){
    super()
    this.schema = Object.assign({}, headingTagSchema)

    this.metaFragment = 'h2' 

    this.fieldName = 'headingTag'
  }

  copyMeta(from, to){
    to.headingTag = from.headingTag
  }

  toViewModel(model, meta){
    model.classList.add(meta[this.fieldName])
  }
}

var addonHeadingTag = (node)=>{
  let headingTag = new HeadingTag
  headingTag.addon(node)
  return headingTag
}

export {addonHeadingTag}

