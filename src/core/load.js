import {RXArray} from "../basic/rxarray"
  
function load(data){
  let dataJson = JSON.parse(data)
  let nodes = loadNodes(dataJson, rxEditor.canvas)
  return nodes
}

function loadNodes(dataArray, parent){
  let nodes = new RXArray
  if(!dataArray){
    return nodes
  }
  dataArray.forEach((child)=>{
    let node = loadOneNode(child, parent)
    if(node){
      nodes.push(node)
    }
  })

  return nodes
}

function loadOneNode(schema, parent){
  let node = createElement(schema.name)
  if(node){
    node.$meta = schema.meta
    node.parent = parent
    node.children = loadNodes(schema.children, node)
    return node
  }
}

function createElement(className){
  for(var moduleName in rxEditor.elements){
    for(var nodeName in rxEditor.elements[moduleName]){
      let node = rxEditor.elements[moduleName][nodeName]
      if(node.className === className){
        return node.make()
      }
    }
  }
}

export {load, loadOneNode}