<template>
  <div class="simple-accordion">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'SimpleAccordion',
  props: {
    multiple: { default: false}
  },
  data() {
    return {items: [] }
  },
  
  created() {
    this.items = this.$children
  },

  mounted () {
    //this.items.forEach(item=>{
    //  item.$on('itemClick', this.itemClick)
    //})
  },

  methods: {
    itemClick(clickedItem) {
      clickedItem.isActive = !clickedItem.isActive
      if(!this.multiple){
        this.items.forEach(item => {
          if(item !== clickedItem){
            item.isActive = false
          }
        })
      }
    }
  },

}
</script>

<style>
  .simple-accordion{
    flex: 1;
    width: 100%;
    overflow: auto;
    height: 0;
    display: flex;
    flex-flow: column;
    /*margin-top: 2px;*/
  }
  .simple-accordion .collapsible-item{
    display: flex;
    flex-flow: column;
    width: 100%;
  }
  .simple-accordion .item-heading{
    display: flex;
    flex-flow: row;
    flex-wrap: wrap;
    align-items: center;
    font-size: 12px;
    color:#f0f1ef;
    padding-left: 10px;
    padding-top:10px;
    padding-bottom:10px;
    padding-right:20px;
    position: relative;
    /*border-top:#484848 solid 1px;*/
    border-bottom:#282828 solid 1px;
    cursor: default;
  }

  .simple-accordion .item-heading:hover{
    background: rgba(255,255,255,0.05);
  }

  .simple-accordion .collapsible-item .item-heading span{
    margin-right: 5px;
  }

  .simple-accordion .collapsible-item .item-heading small{
    white-space:nowrap;
    color: #aaa;
    font-size: 11px;
  }


  .simple-accordion .collapsible-item .item-heading::after{
    position: absolute;
    content: '';
    width: 0; 
    height: 0;
    top: calc(50% - 2px);
    right: 19px;
    border-width: 4px;
    border-style: solid;
    border-color: #f0f1ef transparent transparent  transparent;
  }

  .simple-accordion .item-body{
    flex: 1;
    /*overflow: auto;*/
    /*border-top:#282828 solid 1px;*/
    padding: 5px;
  }

  .simple-accordion .collapsible-item.item-collapse .item-heading::after{
    position: absolute;
    content: '';
    width: 0; 
    height: 0;
    top: calc(50% - 2px);
    right: 17px;
    border-width: 4px;
    border-style: solid;
    border-color:transparent transparent  transparent #f0f1ef;
  }

  .simple-accordion .collapsible-item.item-collapse .item-body{
    display: none;
  }

</style>