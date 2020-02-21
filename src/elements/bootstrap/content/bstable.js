import {RXElement} from "../../rxelement"
//import {addonTypyListUnstyled} from "../schemas/content/list-unstyled"
//import {addonTypyListInline} from "../schemas/content/list-inline"

export class BSTable extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupContent'
    this.toolboxInfo.elementId = 'htmlTable'
    this.toolboxInfo.elementName = "table"
    this.className = 'BSTable'

    //this.editMarginStyle.padding = '20px;'
    //this.editMarginStyle = {}

    //this.groups.paragraphOptions = {
    //  label:'Paragraph Options'
    //}
    this.$meta.tag = 'table'
    this.$meta.innerHTML = `
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
    `
    this.label = "table"
    this.acceptedChildren=[]
  }

  make(){
    return new BSTable
  }

  toViewModel(){
    let model = super.toViewModel()
    model.attributes.contentEditable = true
    model.innerHTML = this.$meta.innerHTML
    return model
  }

}
