import {Node} from "./node.js"
import {RXArray} from "../basic/rxarray"

export class RXEditor{
  constructor() {
    this.innerHTML = `
      <div class="container">
        <div class="row">
          <div class="column"> test </div>
          <h2>Heading</h2>
        </div>
      </div>
    `

    this.nodes = new RXArray
  }

  hangOn(id){
    this.workspace = document.getElementById(id)
    this.workspace.innerHTML = this.innerHTML
    //console.log(this.workspace.children)
    this.paraseNode(this.workspace)
    //this.workspace.childNodes.forEach(child=>{
    //  console.log(child)
    //})
  }

  paraseNode(element){
    for(var i = 0; i < element.children.length; i++){
      let child = element.children[i]
      console.log(child, child.nodeName, child.nodeType)
      let node = new Node(child)
      this.nodes.add(node)
      this.paraseNode(child)
    }
  }
}

