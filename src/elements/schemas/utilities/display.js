var utilDisplaySchema = {
  group:'utilities',
  isResponsive:true,
  xs:{
    label:'Display',
    widget:'OpSelect',
    list:{
      'd-none':'None',
      'd-inline':'Inline',
      'd-inline-block':'Inline Block',
      'd-block':'Block',
      'd-table':'Table',
      'd-table-cell':'Table Cell',
      'd-table-row':'Table Row',
      'd-flex':'Flex',
      'd-inline-flex':'Inline Flex',
    },
  },
  //---------------------
  sm:{
    label:'Display',
    widget:'OpSelect',
    list:{
      'd-sm-none':'None',
      'd-sm-inline':'Inline',
      'd-sm-inline-block':'Inline Block',
      'd-sm-block':'Block',
      'd-sm-table':'Table',
      'd-sm-table-cell':'Table Cell',
      'd-sm-table-row':'Table Row',
      'd-sm-flex':'Flex',
      'd-sm-inline-flex':'Inline Flex',
    },
  },
  //---------------------
  md:{
    label:'Display',
    widget:'OpSelect',
    list:{
      'd-md-none':'None',
      'd-md-inline':'Inline',
      'd-md-inline-block':'Inline Block',
      'd-md-block':'Block',
      'd-md-table':'Table',
      'd-md-table-cell':'Table Cell',
      'd-md-table-row':'Table Row',
      'd-md-flex':'Flex',
      'd-md-inline-flex':'Inline Flex',
    },
  },
  //---------------------
  lg:{
    label:'Display',
    widget:'OpSelect',
    list:{
      'd-lg-none':'None',
      'd-lg-inline':'Inline',
      'd-lg-inline-block':'Inline Block',
      'd-lg-block':'Block',
      'd-lg-table':'Table',
      'd-lg-table-cell':'Table Cell',
      'd-lg-table-row':'Table Row',
      'd-lg-flex':'Flex',
      'd-lg-inline-flex':'Inline Flex',
    },
  },
  //---------------------
  xl:{
    label:'Display',
    widget:'OpSelect',
    list:{
      'd-xl-none':'None',
      'd-xl-inline':'Inline',
      'd-xl-inline-block':'Inline Block',
      'd-xl-block':'Block',
      'd-xl-table':'Table',
      'd-xl-table-cell':'Table Cell',
      'd-xl-table-row':'Table Row',
      'd-xl-flex':'Flex',
      'd-xl-inline-flex':'Inline Flex',
    },
  },
  //---------------------
}//<--

function replaceNone(str){
  if(str){
    return str.replace('-none','-rx-none')
  }
}

var utilDisplayToViewModel = (model, metaFragment)=>{
  //console.log(metaFragment)
  if(metaFragment){
    model.classList.add(replaceNone(metaFragment.xs))
    model.classList.add(replaceNone(metaFragment.sm))
    model.classList.add(replaceNone(metaFragment.md))
    model.classList.add(replaceNone(metaFragment.lg))
    model.classList.add(replaceNone(metaFragment.xl))
  }
}


export{utilDisplaySchema, utilDisplayToViewModel}

