import {OptionFragment} from "../option-fragment"

let headingPseudoSchema = {
  label:'Pseudo Heading',
  widget:'OpSelect',
  defaultValue:'',
  list:{
    'h1':'H1',
    'h2':'H2',
    'h3':'H3',
    'h4':'H4',
    'h5':'H5',
    'h6':'H6',
  },
}

class HeadingPseudo extends OptionFragment{
  constructor(){
    super()
    this.schema = Object.assign({}, headingPseudoSchema)

    this.fieldName = 'headingPseudo'
  }

  copyMeta(from, to){
    to.headingPseudo = from.headingPseudo
  }

  metaToModel(model, meta){
    model.classList.add(meta[this.fieldName])
  }
}

var addonHeadingPseudo = (node, groupName)=>{
  let headingPseudo = new HeadingPseudo
  headingPseudo.addon(node, groupName)
  return headingPseudo
}

export {addonHeadingPseudo}

