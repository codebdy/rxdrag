
export class OptionGroup{
  constructor(label, selected) {
    this.rows = []
    this.label = label
    this.selected = selected
  }

  resolveValues(node){
    this.rows.forEach(row=>{
      row.resolveValue(node)
    })
  }

  fillBackValues(node){
    this.rows.forEach(row=>{
      row.fillBackValue(node)
    })
  }
} 