var textColor = {
  fieldName:'classList',
  label:'Text Color',
  widget:'OpSelect',
  list:{
    'text-primary':'Primary',
    'text-secondary':'Secondary',
    'text-success':'Success',
    'text-danger':'Danger',
    'text-warning':'Warning',
    'text-info':'Info',
    'text-light':'Light',
    'text-dark':'Dark',
    'text-muted':'Muted',
    'text-white':'White',
  },
}

var backgroundColor = {
  fieldName:'classList',
  label:'Background Color',
  widget:'OpSelect',
  list:{
    'bg-primary':'Primary',
    'bg-secondary':'Secondary',
    'bg-success':'Success',
    'bg-danger':'Danger',
    'bg-warning':'Warning',
    'bg-info':'Info',
    'bg-light':'Light',
    'bg-dark':'Dark',
    'bg-white':'White',
    'bg-transparent':'Transparent',
  },
}

export default {
  fieldName:'classList',
  label:'Color',
  isRowGroup:true,
  fields:[textColor, backgroundColor],
}