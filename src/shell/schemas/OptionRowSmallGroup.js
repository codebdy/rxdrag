import {OptionGroup} from "./OptionGroup"

export class OptionRowSmallGroup extends OptionGroup{
  constructor(label) {
  	super(label)
    this.isRowGroup = true
    this.rows = []
  }

} 