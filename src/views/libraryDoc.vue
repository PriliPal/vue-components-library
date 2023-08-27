<template>
  <div>

    <div class="content">

      <animated-collapse
          :array-length="arrayOfObjects.length"
          :title="'Collapse title'"
          :collapse-default-opened="true"
          :open-by="'all'"
          :element-size="'auto'"
          :collapse-id="0"
          :speed="300"
      >
        <div
            class="collapse-item unselectable cursor-pointer"
            v-for="(item, index) of arrayOfObjects"
            :key="'collapseId'+'0'+'collapseItem'+index"
            :id="'collapseId'+'0'+'collapseItem'+index"
        >
          <span>{{index+1}}. </span>
          {{item.body}}
        </div>
      </animated-collapse>

    </div>

    <div class="content">
      <div v-for="index in 3" class="radio" :key="`radio${index}`" @click="changeCheckedIndexRadio(index)">
        <radio-button :checked="checkedIndexRadio === index">I am radiobutton</radio-button>
      </div>

      <div v-for="index in 3" class="checkbox" :key="`checkbox${index}`" @click="changeCheckedIndexCheckbox(index)">
        <check-box  :checked="checkedIndexCheckbox.includes(index)">I am checkbox</check-box>
      </div>
    </div>


    <div class="content">

      <custom-search
          :placeholder="'Search'"
          :max-width="'400px'"
          @updateSearchInputValue="updateSearchInputValue"
          @startSearch="startSearch"
      />

      <div>
        <h3>
          searchInputValue: {{searchInputValue}}
        </h3>
      </div>
      <div>
        <h3>
          searchValue: {{searchValue}}
        </h3>
      </div>

    </div>

  </div>
</template>

<script>
import AnimatedCollapse from "@/components/widgets/AnimatedCollapse/AnimatedCollapse.vue";
import RadioButton from "@/components/customButtons/radio/RadioButton.vue";
import CheckBox from "@/components/customButtons/checkbox/CheckBox";
import CustomSearch from "@/components/CustomSearch/CustomSearch";

export default {
  name: "docAnimatedCollapse",

  components: {CustomSearch, CheckBox, RadioButton, AnimatedCollapse},

  data() {
    return {

      arrayOfObjects: [
        {
          id: 0,
          body: 'The text of the first collapse item'
        },
        {
          id: 1,
          body: 'The text of the second collapse item'
        },
        {
          id: 2,
          body: 'The text of the third collapse item'
        },
        {
          id: 3,
          body: 'The text of the fourth collapse item'
        },
      ],

      checkedIndexRadio: 1,
      checkedIndexCheckbox: [],

      searchInputValue: '',
      searchValue: '',

    }
  },

  methods: {
    changeCheckedIndexRadio(index) {
      this.checkedIndexRadio = index
    },
    changeCheckedIndexCheckbox(index) {
      if (this.checkedIndexCheckbox.includes(index)) {
        this.checkedIndexCheckbox.splice(this.checkedIndexCheckbox.indexOf(index), 1)
      } else {
        this.checkedIndexCheckbox.push(index)
      }
    },

    updateSearchInputValue(value) {
      this.searchInputValue = value
    },

    startSearch(value) {
      this.searchValue = value
    },
  }
}
</script>

<style>

.content {
  height: 100%;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: solid 2px #727272;
}

.collapse-item {
  padding: 10px;
  background-color: white;
  border-radius: 10px;
  transition: ease-out 0.2s;
}

.collapse-item:hover {
  background-color: #efefef;
}

.cursor-pointer {
  cursor: pointer;
}

.unselectable {
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}

.radio {
  margin: 5px;
}

.checkbox {
  margin: 5px;
}


</style>