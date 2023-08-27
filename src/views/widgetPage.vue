<template>
  <div>
    <weather-forecast></weather-forecast>
  </div>
</template>

<script>
import WeatherForecast from "@/components/widgets/WeatherForecast/WeatherForecast.vue"

export default {
  name: "widgetPage",
  components: {
    WeatherForecast
  }
}
</script>

<style scoped>

</style>