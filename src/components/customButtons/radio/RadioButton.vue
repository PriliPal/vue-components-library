<template>

    <div
        class="custom-button-radio"
    >
        <div :class="checked ? 'custom-button-radio-checked' : 'custom-button-radio-unchecked'"/>
      <div class="custom-button-radio-slot">
        <slot></slot>
      </div>

    </div>

</template>

<script>
import './RadioButton.css'

export default {
    name: "RadioButton",

    props: {
      checked: {
        type: Boolean,
        default: false
      }
    },
}
</script>

<style></style>