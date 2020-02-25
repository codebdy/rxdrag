import {RXComponent} from "../basic/rxcomponent"


class TreeNode extends RXComponent{
  constructor(tree, schema){
    super()
    this.tree = tree
    this.schema = schema ? schema : {id:''}
    this.cssClass('tree-node')

    this.nodeBody = new RXComponent()
                    .cssClass('tree-node-body')

    let titleIcon = new RXComponent()
                    .cssClass('title-icon')
                    .domOn('click', ()=>{
                      this.tongle('open')
                    })
                    //.setInnerHTML('△')
    this.titleText = new RXComponent()
                    .cssClass('title-text')
                    .domOn('click',()=>{
                      if(this.schema.id){
                        this.tree.onNodeClick(this.schema)
                      }
                    })
                    
    this.nodeTitle = new RXComponent()
                    .cssClass('tree-node-title')
                    .pushChild(titleIcon)
                    .pushChild(this.titleText)
                    

    this.pushChild(this.nodeTitle)
    this.pushChild(this.nodeBody)

    if(schema){
      let title = schema.tag
      if(schema.label !== schema.tag){
        title = schema.tag + "(" + schema.label + ")"
      }
      this.title(title)
      this.cssClass('leaf')
      if(schema.state === 'focusedState'){
        this.cssClass('focused')
      }
      if(schema.children.length > 0){
        this.removeCssClass('leaf')
        this.loadChildren(schema.children)
      }
    }

  }

  title(title){
    this.titleText.setInnerHTML(title)
    return this
  }

  add(node){
    node.parent = this
    this.nodeBody.pushChild(node)
    return this
  }

  removeChild(node){
    this.nodeBody.removeChild(node)
  }

  loadChildren(schemas){
    if(!schemas) return

    schemas.forEach((schema)=>{
      this.add(new TreeNode(this.tree, schema))
    })
    if(this.nodeBody.$dom){
      this.nodeBody.refresh()
    }
  }

  focuseNode(node){
    if(this.schema.id && node.id == this.schema.id){
      this.cssClass('focused')
    }
    else{
      this.removeCssClass('focused')
    }

    this.nodeBody.children.forEach((child)=>{
      child.focuseNode(node)
    })
  }

  unFocusNode(id){
    if(this.schema && this.schema.id === id){
      this.removeCssClass('focused')
    }
    this.nodeBody.children.forEach((child)=>{
      child.unFocusNode(id)
    })
  }

  excuteCommand(commandSchema){
    if(commandSchema.command === 'new'
      && this.schema.id == commandSchema.parentId){
      let newNode = new TreeNode(this.tree, commandSchema.node)
      this.insertBefore(newNode, commandSchema.nextSblilingId)
      return
    }
    if(this.schema.id && commandSchema.nodeId === this.schema.id){
      if(commandSchema.command === 'delete'){
        this.parent.removeChild(this)
      }
      return
    }

    this.nodeBody.children.forEach((child)=>{
      child.excuteCommand(commandSchema)
    })
  }

  insertBefore(node, sbilingId){
   let sbilingNode = this.tree.getNodeById(sbilingId)
   this.nodeBody.children.inertBefore(node, sbilingNode)
   //console.log(this.nodeBody.children)
   this.nodeBody.refresh()
  }

  getNodeById(id){
    if(this.schema.id === id){
      return this
    }

    this.nodeBody.children.forEach((child)=>{
      return child.getNodeById(id)
    })
  }

}


export class NodeTree extends RXComponent{
  constructor(){
    super()
    this.cssClass('node-tree-box')
    this.pushChild(
      new RXComponent()
      .cssClass('tree-header')
      .setInnerHTML('Elements View')
    )

    this.bodyNode = new TreeNode(this)
                     .title('body')
                     .cssClass('disable')

    let rootNode = new TreeNode(this)
                   .title('html')
                   .cssClass('disable')
                   .add(this.bodyNode )
    this.pushChild(
      new RXComponent()
      .cssClass('tree-body')
      .pushChild(
        new RXComponent()
        .cssClass('tree-content')
        .pushChild(rootNode)
      )
    )

    this.assembleTreeView = (nodes)=>{
      this.bodyNode.loadChildren(nodes)
    }

    this.onNodeClick = (node)=>{}
  }

  focusNode(node){
    this.bodyNode.focuseNode(node)
  }

  unFocusNode(id){
    this.bodyNode.unFocusNode(id)
  }

  excuteCommand(commandSchema){
    this.bodyNode.excuteCommand(commandSchema)
  }

  getNodeById(id){
    return this.bodyNode.getNodeById(id)
  }
}
