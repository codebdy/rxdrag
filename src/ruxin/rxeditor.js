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

  paraseNode(node){
    for(var i = 0; i < node.children.length; i++){
      let child = node.children[i]
      console.log(child, child.nodeName, child.nodeType)
      this.paraseNode(child)
    }
  }
}

