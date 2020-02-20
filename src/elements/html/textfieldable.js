import {RXElement} from "../rxelement"
import {addonGeneralTextfield} from "../schemas/general/textfield"

export class RXTextfieldable extends RXElement{
  constructor() {
    super()
    addonGeneralTextfield(this)
  }

  toViewModel(){
    if(this.$meta.generalTextfield === 'contentEditable'){
      this.editMarginStyle.padding = ''
    }
    else{
      this.editMarginStyle.padding = '30px'
    }
    return super.toViewModel()
  }

}