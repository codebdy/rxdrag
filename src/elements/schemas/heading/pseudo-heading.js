import {OptionFragment} from "../option-fragment"

let headingPseudoSchema = {
  label:'Display',
  group:'generalOptions',
  widget:'OpSelect',
  defaultValue:'',
  list:{
    'display-1':'Display 1',
    'display-2':'Display 2',
    'display-3':'Display 3',
    'display-4':'Display 4',
  },
}

class HeadingPseudo extends OptionFragment{
  constructor(){
    super()
    this.schema = Object.assign({}, headingPseudoSchema)

    this.metaFragment = '' 

    this.fieldName = 'headingPseudo'
  }

  copyMeta(from, to){
    to.headingPseudo = from.headingPseudo
  }

  toViewModel(model, meta){
    model.classList.add(meta[this.fieldName])
  }
}

var addonHeadingPseudo = (node)=>{
  let headingPseudo = new HeadingPseudo
  headingPseudo.addon(node)
  return headingPseudo
}

export {addonHeadingPseudo}

