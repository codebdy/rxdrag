function valueEqual(a, b){
  if(Array.isArray(a) && Array.isArray(b)){
    let aValue = a.concat()
    let bValue = b.concat()
    return aValue.sort().toString() === bValue.sort().toString() 
  }
  else{
    return a === b
  }
}

function cloneValue(val){
  if(Array.isArray(val)){
    return val.concat()
  }
  return val
}

//无重复添加
function addToArray(val, array){
  let hasValue = false
  array.forEach(arr=>{
    if(arr === val){
      hasValue = true
    }
  })

  if(!hasValue){
    array.push(val)
  }
}

function removeFromArray(val, array){
  for(var i = 0; i < array.length; i++){
    if(array[i] === val){
      array.splice(i,1)
    }
  }
}

export{valueEqual, cloneValue, addToArray, removeFromArray}