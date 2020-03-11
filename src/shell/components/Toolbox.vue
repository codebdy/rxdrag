<template>
  <SimpleAccordion>
    <CollapsibleItem 
      v-for="(group, i) in groups"
      :selected = 'i == 0 ? true : false'
      :key = "i"
    >
      <template #heading>
        <span>{{group.title}}</span>
        <small v-if="group.smallTitle">{{group.smallTitle}}</small>
      </template>
      <template #body>
        <MouseOverPop 
          class = "toolbox-element"
          v-for = "(item,j) in group.items"
          :key = "j"
        >
          <template #heading>
            <div class="element-title">
              <i class="fas fa-file"></i> {{item.title}}
            </div>
          </template>
          <template #body>
            <div v-if="item.thumbnail" class="pop-content">
              <img style="width: 100%;" :src="item.thumbnail" />
            </div>
          </template>
        </MouseOverPop>
      </template>
    </CollapsibleItem>
  </SimpleAccordion>
</template>

<script>
import SimpleAccordion from './accordion/SimpleAccordion.vue'
import CollapsibleItem from './accordion/CollapsibleItem.vue'
import MouseOverPop from './MouseOverPop.vue'

export default {
  name: 'Toolbox',
  components:{
    SimpleAccordion,
    CollapsibleItem,
    MouseOverPop,
  },
  props:{
    groups:{ default:[] }, 
  },
  data () {
    return {
    }
  },

  methods: {
  },
}
</script>

<style>
  .toolbox-element .element-title{
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: default;
    color: #c2c2c2;
    font-size: 13px;
    padding:5px 10px;
    padding-left:20px;
    margin:3px;
    display: flex;
    flex-flow: row;
    align-items: center;
  }

  .toolbox-element .element-title i{
    margin-right: 5px;
    margin-top:1px;
  }

  .toolbox-element .element-title:hover{
    background: rgba(255,255,255,0.05)

  }

  .toolbox-element{
    padding-left: 0;
    line-height: 20px;
}

  .toolbox-element .pop-content{
    position: absolute;
    top:70px;
    left:100%;
    width: 320px;
    padding:10px;
    background: #eee;
  }
  .toolbox-element .pop-content img{
    width: 100%;
  }
</style>