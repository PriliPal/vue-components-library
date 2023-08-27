<template>
  <div class="collapse">

<!--collapse head-->

    <h4
        class="collapse-head collapse-unselectable collapse-cursor-pointer"
        v-if="openBy === 'title'"
        @click="openOrCloseCollapse"
    >
      {{title}}
    </h4>

    <h4
        class="collapse-head collapse-unselectable"
        v-else-if="openBy === 'button'"
    >
      {{title}}
      <span
          class="collapse-open__button collapse-cursor-pointer"
          :ref="'collapse-open-button'+collapseId"
          @click="openOrCloseCollapse"
      >

        <svg
            class="collapse__arrow-top"
            viewBox="-2.4 -2.4 28.80 28.80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#000000"
            stroke-width="0.00024000000000000003"
            transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.048"></g>
          <g id="SVGRepo_iconCarrier">
            <path
                d="M18.2929
                15.2893C18.6834
                14.8988 18.6834
                14.2656 18.2929
                13.8751L13.4007
                8.98766C12.6195
                8.20726 11.3537
                8.20757 10.5729
                8.98835L5.68257
                13.8787C5.29205
                14.2692 5.29205
                14.9024 5.68257
                15.2929C6.0731
                15.6835 6.70626
                15.6835 7.09679
                15.2929L11.2824
                11.1073C11.673
                10.7168 12.3061
                10.7168 12.6966
                11.1073L16.8787
                15.2893C17.2692
                15.6798 17.9024
                15.6798 18.2929
                15.2893Z"
                fill="#31313a">
            </path>
          </g>
        </svg>
      </span>
    </h4>

    <h4
        class="collapse-head collapse-unselectable collapse-cursor-pointer"
        v-else
        @click="openOrCloseCollapse"
    >
      {{title}}
      <span
          v-if="openBy === 'all'"
          :ref="'collapse-open-button'+collapseId"
          class="collapse-open__button"
      >

        <svg
            class="collapse__arrow-top"
            viewBox="-2.4 -2.4 28.80 28.80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#000000"
            stroke-width="0.00024000000000000003"
            transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.048"></g>
          <g id="SVGRepo_iconCarrier">
            <path
                d="M18.2929
                15.2893C18.6834
                14.8988 18.6834
                14.2656 18.2929
                13.8751L13.4007
                8.98766C12.6195
                8.20726 11.3537
                8.20757 10.5729
                8.98835L5.68257
                13.8787C5.29205
                14.2692 5.29205
                14.9024 5.68257
                15.2929C6.0731
                15.6835 6.70626
                15.6835 7.09679
                15.2929L11.2824
                11.1073C11.673
                10.7168 12.3061
                10.7168 12.6966
                11.1073L16.8787
                15.2893C17.2692
                15.6798 17.9024
                15.6798 18.2929
                15.2893Z"
                fill="#31313a">
            </path>
          </g>
        </svg>
      </span>
    </h4>



<!--collapse body-->

    <div
        class="collapse-body"
        :id="'collapseList'+collapseId"
        :ref="'collapseList'+collapseId"
    >
      <slot></slot>
    </div>

  </div>
</template>

<script>
import './AnimatedCollapse.css'
import getHEP from "@/js-functions/getHtmlElementProperties.js";

export default {
  name: "AnimatedCollapse",

  // doc
  // when using AnimatedCollapse outputting an array via v-for specify as :id="'collapseId'+collapseId+'collapseItem'+index"
  // don't use margin to separate elements from each other

  props: {
    arrayLength: {
      type: Number,
      default: 1 // if you use v-for specify the length of the array you are iterating over
    },
    title: {
      type: String,
      default: '' // collapse title
    },
    collapseDefaultOpened: {
      type: Boolean,
      default: true // open collapse by default or not
    },
    openBy: {
      type: String,
      default: 'all' // possible options: ['button', 'title', 'all']
    },
    elementSize: {
      type: String,
      default: 'auto' // possible options: 'auto' or user value in this format 'number + px' ignoring padding and margin
    },
    collapseId: {
      type: Number,
      default: 0 // if you use several collapses, specify a unique numeric id for them
    },
    speed: {
      type: Number,
      default: 200 // transition time in ms
    },

  },

  data() {
    return {
      collapseClosed: this.collapseDefaultOpened
    }
  },

  mounted() {
    if (this.arrayLength <= 0) {
      throw new Error('array length must be greater than 0')
    }

    if (typeof this.arrayLength !== 'number') {
      throw new Error('array length must be a number type')
    }

    if (!this.title) {
      throw new Error('title value cannot be empty, undefined or null')
    }

    if (this.elementSize !== 'auto') {

      for (let i=0; i < this.arrayLength; i++) {
        document.getElementById('collapseItem'+this.collapseId+i).style.height = this.elementSize
        this.$refs['collapseList'+this.collapseId].style.height = parseFloat(this.elementSize) * this.arrayLength + 'px'
      }

    }

    this.$refs['collapseList'+this.collapseId].style.height = this.calculateTotalHeight('collapseId'+this.collapseId+'collapseItem')

    setTimeout(() => {
      this.$refs['collapseList'+this.collapseId].style.transition = this.speed + 'ms'
      if (this.openBy !== 'title') {
        this.$refs['collapse-open-button'+this.collapseId].style.transition = this.speed + 'ms'
      }
    }, 1)
    this.openOrCloseCollapse()

    setInterval(() => {
      this.resetTotalHeight()
    }, 1000)
  },

  updated() {
    this.collapseClosed = !this.collapseClosed
    this.openOrCloseCollapse()
  },

  methods: {

    openOrCloseCollapse() {

      this.collapseClosed = !this.collapseClosed

      if (this.openBy !== 'title') {
        if (this.collapseClosed) {
          this.$refs['collapse-open-button'+this.collapseId].style.transform = "rotate(180deg)"
        } else {
          this.$refs['collapse-open-button'+this.collapseId].style.transform = "rotate(0deg)"
        }
      }

      if (this.collapseClosed) {
        this.$refs['collapseList'+this.collapseId].style.height = '0'
        this.$refs['collapseList'+this.collapseId].style.opacity = '0'
      } else {
        this.$refs['collapseList'+this.collapseId].style.height = this.calculateTotalHeight('collapseId'+this.collapseId+'collapseItem')
        this.$refs['collapseList'+this.collapseId].style.opacity = '1'
      }

    },

    calculateTotalHeight(id) {
      let totalHeight = 0

      for (let i=0; i < this.arrayLength; i++) {
        totalHeight += parseFloat(getHEP.getHeight(id+i)) +
            parseFloat(getHEP.getPadding(id+i).top) +
            parseFloat(getHEP.getPadding(id+i).bottom)
      }

      return totalHeight + 'px'
    },

    resetTotalHeight() {
      if (!this.collapseClosed) {
        this.$refs['collapseList'+this.collapseId].style.height = this.calculateTotalHeight('collapseId'+this.collapseId+'collapseItem')
      }
    },

  }

}
</script>