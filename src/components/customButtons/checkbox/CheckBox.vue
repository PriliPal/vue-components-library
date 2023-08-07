<template>

    <div class="custom-button-checkbox d-inline-flex align-items-center">
        <div :class="checked ? 'custom-button-checkbox-checked' : 'custom-button-checkbox-unchecked'">
          <svg class="custom-button-checkbox-checked-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 12.6111L8.92308 17.5L20 6.5" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        </div>
        <slot></slot>
    </div>

</template>

<script>
import './CheckBox.css'

export default {
    name: "CheckBox",

    props: {
      checked: {
        type: Boolean,
        default: false
      }
    },
}
</script>

<style></style>
