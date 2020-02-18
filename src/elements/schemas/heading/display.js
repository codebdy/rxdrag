import {OptionFragment} from "../option-fragment"

let headingDisplaySchema = {
  label:'Display',
  group:'headingOptions',
  widget:'OpSelect',
  defaultValue:'',
  list:{
    'display-1':'Display 1',
    'display-2':'Display 2',
    'display-3':'Display 3',
    'display-4':'Display 4',
  },
}

class HeadingDisplay extends OptionFragment{
  constructor(){
    super()
    this.schema = Object.assign({}, headingDisplaySchema)

    this.metaFragment = '' 

    this.fieldName = 'headingDisplay'
  }

  copyMeta(from, to){
    to.headingDisplay = from.headingDisplay
  }

  toViewModel(model, meta){
    model.classList.add(meta[this.fieldName])
  }
}

var addonHeadingDisplay = (node)=>{
  let headingDisplay = new HeadingDisplay
  headingDisplay.addon(node)
  return headingDisplay
}

export {addonHeadingDisplay}

