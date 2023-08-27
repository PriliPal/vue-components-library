<template>

  <div class="weather" @click="openWeatherChoice" ref="weather">

    <div class="weather-background" ref="weatherBackground"></div>

    <div v-if="cityChoiceOpened" :class="cityChoiceOpened ? 'cities-choice-background' : ''">

      <div class="cities-choice">
        <div
            v-for="city in availableCities"
            class="city text-nowrap"
            :key="city"
            @click="changeCurrentCity(city)"
        >
          {{ city }}
        </div>
      </div>

    </div>

    <div class="all-info" :class="cityChoiceOpened ? 'invisible':''">

      <div class="city-and-description">
        {{ weather.city }} - {{ weather.weather }}
      </div>

      <div class="temp">
        {{ weather.temp }} °C
      </div>

      <div class="other-info">

        <div class="temp-feel">
          Ощущается <span class="text-nowrap">как {{ weather.feelsLikeTemp }} °C</span>
        </div>

        <div class="wind-speed">
          Скорость <span class="text-nowrap">ветра {{ weather.windSpeed }} м/с</span>
        </div>

        <div class="visibility">

          Видимость

          <span :key="visibility.value" v-for="(visibility) in visibilityMap">
            <span v-if="weather.visibility >= visibility.from && weather.visibility <= visibility.to">
              {{ visibility.value }}
            </span>
          </span>

        </div>

      </div>

    </div>

  </div>

</template>

<script>
import config from './config.js'

export default {
  name: "WeatherForecast",

  data() {
    return {
      receivedWeather: {},
      weather: {
        city: '',
        weather: '',

        temp: 0,
        feelsLikeTemp: 0,

        visibility: '',
        windSpeed: 0,
      },
      cityChoiceOpened: false,
      background: '',
      currentTime: '',
      currentCity: config.cities.default,
      availableCities: config.cities.all,
      url: config.apiUrl,
      openWeatherKey: config.appid,
      lang: config.languages.default,
      languages: config.languages,
      visibilityMap: config.visibility
    }
  },

  mounted() {
    this.getWeather()
    // setInterval(() => {
    //   this.getWeather()
    // },  30000)
  },

  methods: {

    changeLang(language) {
      this.lang = language

      this.getWeather()
    },

    findOutCurrentTime() {
      const now = new Date().getHours()
      if (now >= 6 || now <= 21) {
        this.currentTime = 'night'
      } else {
        this.currentTime = 'day'
      }
    },

    getWeather() {
      fetch(`${this.url}?q=${this.currentCity}&lang=${this.lang}&appid=${this.openWeatherKey}`)
          .then(response => {

            if (response.status === 404) {
              throw new Error('Неверно указан город')
            }

            if (response.status === 401) {
              throw new Error('Неверно указан appid или такого appid не существует')
            }

            return response.json()

          })
          .then(data => {

            this.weather = this.mapWeather(data)

            this.findOutCurrentTime()

            this.changeBackground(this.weather.weather)

          })
          .catch(error => {
            console.log(error)
          })
    },

    convertKelvinToCelsius(temp) {
      return Math.round((temp - 273.15) * 10) / 10
    },

    mapWeather(data) {

      let weather = {}

      weather.city = data.name
      weather.weather = data.weather[0].description
      weather.temp = this.convertKelvinToCelsius(data.main.temp)
      weather.feelsLikeTemp = this.convertKelvinToCelsius(data.main.feels_like)
      weather.visibility = data.visibility
      weather.windSpeed = data.wind.speed

      return weather;
    },

    changeCurrentCity(city) {
      this.currentCity = city
      this.getWeather()
    },

    changeBackground(weather) {

      if (this.$refs.weatherBackground.classList.length > 1) {
        this.$refs.weatherBackground.classList.remove(this.$refs.weatherBackground.classList[1])
      }

      for (let backgroundKey in config.background) {
        if (config.background[backgroundKey].includes(weather)) {
          this.$refs.weatherBackground.classList.add(`${backgroundKey}_${this.currentTime}`)
        }
      }
    },

    openWeatherChoice() {
      if (this.cityChoiceOpened) {
        this.$refs.weatherBackground.classList.remove('blur')
        this.$refs.weather.style.cursor = 'default;'
      } else {
        this.$refs.weatherBackground.classList.add('blur')
      }
      this.cityChoiceOpened = !this.cityChoiceOpened
    }

  }
}
</script>

<style scoped>

.weather {
  max-width: 680px;
  background-color: rgba(73, 145, 245, 0);
  color: white;
  border-radius: 25px;
  padding: 20px;
  display: block;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  z-index: 0;
  transition: scale linear 0.1s;
}

.weather-background {
  position: absolute;
  left: -10px;
  top: -10px;
  width: calc(100% + 20px);
  height: calc(100% + 20px);
  z-index: -1;
  transition: all linear 0.2s;
}

.blur {
  filter: blur(8px);
  /*scale: 1.05;*/
}

.invisible {
  visibility: hidden;
}

/*облачно, небольшая облачность, переменная облачность, облачно с прояснениями*/
.partly_cloudy_day {
  background-image: url(../../../assets/images/partly_cloudy.jpg);
}
.partly_cloudy_night {
  background-image: url(../../../assets/images/partly_cloudy.jpg);
}

/*пасмурно*/
.mainly_cloudy_day {
  background-image: url(../../../assets/images/mainly_cloudy.jpg);
}
.mainly_cloudy_night {
  background-image: url(../../../assets/images/mainly_cloudy.jpg);
}

/*ясно*/
.clear_day {
  background-image: url(../../../assets/gif/clear_day.gif);
}
.clear_night {
  background-image: url(../../../assets/gif/clear_day.gif);
}

/*небольшой дождь, дождь, небольшой проливной дождь, гроза с сильным дождём*/
.rain_day {
  background-image: url(../../../assets/images/rain.jpg);
}
.rain_night {
  background-image: url(../../../assets/images/rain.jpg);
}



.all-info {
  z-index: 1;
}

.city-and-description {
  font-size: 30px;
}

.temp {
  font-size: 40px;
}

.other-info {
  font-size: 17px;
  display: flex;
}

.temp-feel {
  font-size: 17px;
}

.wind-speed {
  margin-left: 10px;
}

.visibility {
  margin-left: 10px;
}



.cities-choice {
  margin: 0 25px;
  width: calc(100% - 50px);
  position: absolute;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  overflow-y: hidden;
  overflow-x: scroll;
}

.cities-choice-background {
  background-color: rgba(255, 255, 255, 0.17);
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  transition: all linear 1s;
}

.city {
  color: white;
  font-size: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  cursor: pointer;
  padding: 10px;
  transition: all linear .1s;
}

.city:hover {
  color: #c7d2d7;
}

.text-nowrap {
  white-space: nowrap;
}

::-webkit-scrollbar-thumb {
  background-color: white;
  background-clip: padding-box;
  border: 2px solid rgba(255, 255, 255, 0);
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 0 10px rgba(0, 0, 0, 0.025);
}

::-webkit-scrollbar-thumb:hover {
  background-color: #e8e8e8;
}

::-webkit-scrollbar {
  width: 0;
  height: 10px;
}

</style>