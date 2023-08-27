<template>

  <div class="weather" @click="openWeatherChoice" :ref="'weather'">

    <div class="weather-background" id="weather-background"></div>

    <div v-if="cityChoiceOpened" class="cities-choice-background">

      <div class="cities-choice">
        <div
            v-for="city in availableCities"
            class="city text-nowrap"
            :class="currentCity === city ? 'current-city' : ''"
            :key="city"
            @click="changeCurrentCity(city)"
        >
          {{city}}
        </div>
      </div>

    </div>

    <div class="all-info" :class="cityChoiceOpened ? 'invisible':''">

      <div class="city-and-description">
        {{weather.city}} - {{weather.weather}}
      </div>

      <div class="temp">
        {{weather.temp}} °C
      </div>

      <div class="other-info">

        <div class="temp-feel">
          Ощущается <span class="text-nowrap">как {{weather.feelsLikeTemp}} °C</span>
        </div>

        <div class="wind-speed">
          Скорость <span class="text-nowrap">ветра {{weather.windSpeed}} м/с</span>
        </div>

        <div class="visibility">
          Видимость
          <span v-if="weather.visibility === ''"></span>
          <span v-else-if="weather.visibility >= 9000">Отличная</span>
          <span v-else-if="weather.visibility >= 7000">Хорошая</span>
          <span v-else-if="weather.visibility >= 4000">Средняя</span>
          <span v-else>Плохая</span>
        </div>

      </div>

    </div>

  </div>

</template>

<script>
export default {
  name: "WeatherForecast",

  data() {
    return {
      receivedWeather: {},
      weather: {
        city: 'Пушкин',
        weather: '',

        temp: 0,
        feelsLikeTemp: 0,

        visibility: '',
        windSpeed: '',
      },
      cityChoiceOpened: false,
      background: '',
      currentCity: 'Пушкин',
      availableCities: ['Пушкин', 'Санкт-Петербург', 'Москва', 'Новосибирск', 'Казань', 'Уфа', 'Ульяновск', 'Белгород', 'Чебоксары', 'Волгоград'],
      url: 'https://api.openweathermap.org/data/2.5/weather',
      openWeatherKey: '124f67024ef2006f181b69568e3cdb6c',
      lang: 'ru'
    }
  },

  mounted() {
    this.getWeather()
    // setInterval(() => {
    //   this.getWeather()
    // }, 30000)
  },

  methods: {

    getWeather() {
      fetch(`${this.url}?q=${this.currentCity}&lang=${this.lang}&appid=${this.openWeatherKey}`)
        .then(response => response.json())
        .then(data => {
          this.receivedWeather = data

          this.weather.city = this.receivedWeather.name
          this.weather.weather = this.receivedWeather.weather[0].description
          this.weather.temp =  Math.round((this.receivedWeather.main.temp - 273.15) * 10)/10
          this.weather.feelsLikeTemp = Math.round((this.receivedWeather.main.feels_like - 273.15) * 10)/10
          this.weather.visibility = this.receivedWeather.visibility
          this.weather.windSpeed = this.receivedWeather.wind.speed
          this.receivedWeather = {}
          this.changeBackground(this.weather.weather)
        })
        .catch(e => {
          console.log(e)
        })
    },

    changeCurrentCity(city) {
      this.currentCity = city
      this.getWeather()
    },

    changeBackground(weather) {

      if (this.background) {
        document.getElementById('weather-background').classList.remove(this.background)
      }

      if (weather === 'пасмурно') {
        this.background = 'mainly_cloudy'
        document.getElementById('weather-background').classList.add('mainly_cloudy')
      } else if (weather === 'облачно' || weather === 'небольшая облачность' || weather === 'переменная облачность' || weather === 'облачно с прояснениями') {
        this.background = 'partly_cloudy'
        document.getElementById('weather-background').classList.add('partly_cloudy')
      } else if (weather === 'ясно') {
        this.background = 'clear'
        document.getElementById('weather-background').classList.add('clear')
      } else if (weather === 'дождь' || weather === 'небольшой дождь' || weather === 'небольшой проливной дождь' || weather === 'гроза с сильным дождём') {
        this.background = 'rain'
        document.getElementById('weather-background').classList.add('rain')
      }

    },

    openWeatherChoice() {
      if (this.cityChoiceOpened) {
        document.getElementById('weather-background').classList.remove('blur')
        this.$refs.weather.style.cursor = 'default;'
      } else {
        document.getElementById('weather-background').classList.add('blur')
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
  transition: all linear 0.3s;
}

.blur {
  filter: blur(8px);
  /*scale: 1.05;*/
}

.invisible {
  visibility: hidden;
}

/*облачно, небольшая облачность, переменная облачность, облачно с прояснениями*/
.partly_cloudy {
  background-image: url(../../../assets/images/partly_cloudy.jpg);
}
/*пасмурно*/
.mainly_cloudy {
  background-image: url(../../../assets/images/mainly_cloudy.jpg);
}
/*ясно*/
.clear {
  background-image: url(../../../assets/gif/clear_day.gif);
}
/*небольшой дождь, дождь, небольшой проливной дождь, гроза с сильным дождём*/
.rain {
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