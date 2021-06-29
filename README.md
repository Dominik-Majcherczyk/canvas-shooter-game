# Canvas start-shooter game


## struktura aplikacji

### Klasy

Aplikacja posiada trzy główne klasy jakimi są:

- Player - obiekt odpowiadający za gracza
- Enemy - na jego podstawie są generowani przeciwnicy - spadające gwiazdy
- Projectile - pociski gracza
- Particle - odłamki powstałe w wyniku kolizji posicku i przeciwnika
- Star - gwiazdy tworzące tło

## struktura aplikacji
sekcja klas
```js
class Player {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = "#eb4634";
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.shadowColor = "#E3EAEF";
    ctx.shadowBlur = 0;
    ctx.fill();
  }
  update() {
    this.draw();
  }
}

class Projectile {
  constructor(x, y, radius, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = "#eb7d34";
    this.velocity = velocity;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.shadowColor = "#eb7d34";
    ctx.shadowBlur = 20;
    ctx.fill();
  }

  update() {
    this.draw();
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}

class Star {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.shadowColor = "#E3EAEF";
    ctx.shadowBlur = 20;
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }

  update() {
    this.draw();
  }
}

class Enemy {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.shadowColor = "#E3EAEF";
    ctx.shadowBlur = 20;
    ctx.fill();
  }

  update() {
    this.draw();
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
    if (score > 500) {
      this.x = this.x + this.velocity.x + 1;
      this.y = this.y + this.velocity.y + 1;
    }
    if (score > 1000) {
      this.x = this.x + this.velocity.x + 2;
      this.y = this.y + this.velocity.y + 2;
    }
    if (score > 1500) {
      this.x = this.x + this.velocity.x + 3;
      this.y = this.y + this.velocity.y + 3;
    }
    if (score > 2000) {
      this.x = this.x + this.velocity.x + 4;
      this.y = this.y + this.velocity.y + 4;
    }
    if (score > 2500) {
      this.x = this.x + this.velocity.x + 5;
      this.y = this.y + this.velocity.y + 5;
    }
    if (score > 3000) {
      this.x = this.x + this.velocity.x + 6;
      this.y = this.y + this.velocity.y + 6;
    }
  }
}

class Particle {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.alpha = 1;
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }

  update() {
    this.draw();
    this.velocity.x *= friction;
    this.velocity.y *= friction;
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
    this.alpha -= 0.01;
  }
}
```
## struktura klas

Każdy z obiektów posiada swoje właściwości oraz dwie metody  - draw() oraz update()

Metoda draw służy do 'narysowania' czyli stworzenia obiektu (kształtu) w elemencie canvas, w naszym przypadku wszsystkie obiekty są okręgami dlatego każdy obiekt
jest tworzony w opraciu o metodę arc(x, y, promień, kąt rozpoczęcia, kąt zakończenia). Opcjonalnie w niektórych klasach pojawia się metoda shadowblur() 
towrząca poświatę wokół obiektu. Dodatkowo w klasie Particle pojawia się współczynnik alfa który służy do zanikania obiektów.

Metoda update() jest wywoływana w każdej pojedynczej klatce renderu elementu canvas. Jej głównym zastosowaniem jest wywoływanie metody draw()
i zmiana parametrów pozycji w oparciu o wartość velocity (prędkość, im wyższa wartość velocity tym 'szybciej' będzie się poruszać obiekt) klasy tak aby stworzyć animacje ruchu.
KLasy Player oraz Star nie posiadają zmiany wartości velocity, ponieważ instancja klasy Player zawszę podąża za kursorem muszy, a instacje klasy Star to statyczne obiekty tworzące tło.

## tworzenie gracza oraz aktualizacja pozycji


```js
let player = new Player(x, y, 15);
```

Tworzenie instacji gracza znajduje się w segmencie inicjacji zmiennych, stałych oraz obiektów.
Gracza tworzymy poprzez podanie współrzędnych x, y oraz promienia określającego jego wielkość.

Gracz porusza się za kursorem myszy, aby było to możliwe wewnątrz funcji animate() jego współrzędne są podmieniane na współrzędne kursora myszy oraz jest wywoływana metoda update() aby narysować gracza w nowej pozycji

```js
player.x = mouse.x;
player.y = mouse.y;
player.update();
```

## tworzenie przeciwników

tworzenie przeciwników odbywa się wewnątrz funcji spawnEnemies()
















### State management

State management for two or more views is handled by <a href="https://react-redux.js.org/introduction/getting-started">Redux</a> and <a href="https://redux.js.org/tutorials/essentials/part-5-async-logic#thunks-and-async-logic">Redux-thunk</a> for async logic, whose logic is located in the `/reducers` folder, and actions in `/actions` folder

Root reducer consists of three reducers

```js
const rootReducer = combineReducers({
  citiesData: cityReducer,
  cityWeatherInfo: cityWeatherInfoReducer,
  cityName: cityNameReducer,
});
```

- citiesData stores and updates cities shown during search,
- cityName stores and updates city name and key (needed to gather data for a given location - weather and forecasts) when you have selected a new location,
- cityWeatherInfo stores and updates weather data for weatherDashboard component.

### Layout

For the appearance of the application were used the <a href="https://callstack.github.io/react-native-paper/getting-started.html">React-native-paper<a/> library with <a href="https://github.com/satya164/react-native-tab-view">React-native-tab-view</a> and manually created styles with css. Css was implemented in the form of javascript objects, because only this form of styling is allowed in react-native.
Sample of css styling:

```js
  import { View, StyleSheet } from "react-native";
  {...}
  <View style={styles.container}>
  {...}
  const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: "column",
    backgroundColor: "#6d93cc",
  },
  }
```

### In-depth look into used components

#### `App.js`

The App component contains the <a href="https://callstack.github.io/react-native-paper/bottom-navigation.html">BottomNavigation</a> element from the React-native-paper library. This element has its own routing that accepts components that are referenced in the bottom navigation of the application.

```js
const SearchingRoute = () => <Searching setIndex={setIndex} />;
const FavouritesRoute = () => <Favourites setIndex={setIndex} />;
const InfoPanelRoute = () => <InfoPanel />;
```

In this case, the Searching and Favourites components have additional `setIndex` prop, because in these two components you can select the location for which you want to display the data in InfoPanel (by using `fetchUserLocationInfo(lattitude, longtitude)` function) which have index of 0. `setIndex` in this case it acts as a redirect which sets the index to 0.

```js
const fetchUserLocationInfo = async (lat, lon) => {
  await fetch(
    `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apikey}&q=${lat}%2C${lon}`
  )
    .then((res) => res.json())
    .then((city) => {
      dispatch(findCityWeatherInfo(city.Key));
      dispatch(
        setCity({
          cityName: city.LocalizedName,
          cityKey: city.Key,
        })
      );
    })
    .then(setIndex(0))
    .catch((error) => console.log(error));
};
```

It also has an element <a href="https://callstack.github.io/react-native-paper/appbar.html">appbar</a> that as an application header.

#### `Searching.js`

The location finder component, has an "Input" for entering a city name. The request is sent each time the value changes. Cities are displayed using the AccuWeather <a href="https://developer.accuweather.com/accuweather-locations-api/apis/get/locations/v1/cities/autocomplete">Autocomplete search</a> API, so you don't have to type in the whole name to see the names of cities you might be looking for.
It also has a geolocation function, by pressing a button you can instantly redirect into weather display for current location.

```js
import Geolocation from "@react-native-community/geolocation";
{...}
  const findCoordinates = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        fetchUserLocationInfo(
          position.coords.latitude,
          position.coords.longitude
        );
      },
      (error) => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };
```

#### `Favourites.js`

Component displaying all cities saved in <a href="https://react-native-async-storage.github.io/async-storage/docs/install/">async storage</a>. The component retrieves all cities keys from storage and stores them in its local state `keys`. Values are read for all keys and written to the state `favs`.

```js
const getValuesForKeys = async () => {
  let values;
  try {
    values = await AsyncStorage.multiGet(keys);
  } catch (e) {
    console.log(e);
  }
  setFavs(values);
};
```

Each favorite location has options to delete from storage, and redirect to the InfoPanel component to gather and display the data again.

#### `InfoPanel.js`

InfoPanel contains a <a href="https://github.com/satya164/react-native-tab-view">TabView<a/> element that has its own built-in routing.

```js
const FirstRoute = () => <Weather />;

const SecondRoute = () => <ThisWeekForecast />;

const ThirdRoute = () => <TodayForecast />;
```

`Lazy loading`
Callback which returns a custom React Element to render for routes that haven't been rendered yet. Receives an object containing the route as the argument. The lazy prop also needs to be enabled.

```js
const LazyPlaceholder = ({ route }) => (
  <View style={styles.loading}>
    <ActivityIndicator animating={true} color={Colors.red800} />
  </View>
);
```

#### `Weather.js`

Component that retrieves and displays data from the global state.cityWeatherInfo and the city name and key from state.cityName.

###### Saving favourite

It also has a button that can add the currently set city in state.cityName to the async storge as a favorite.

```js
const addFavourite = () => {
  storeData(cityName);
};

const storeData = async (value) => {
  try {
    await AsyncStorage.setItem(`${cityName.cityName}`, JSON.stringify(value));
  } catch (e) {
    console.log("error while saving fav zone");
  }
};
```

#### `TodayForecast.js` & `ThisWeekForecast`

Both components are very similar. They retrieve the current city name and key from the global application state and then send requests to the AccuWeather api to retrieve the forecast object (<a href="https://developer.accuweather.com/accuweather-forecast-api/apis/get/forecasts/v1/hourly/12hour/%7BlocationKey%7D">12-hour</a> and <a href="https://developer.accuweather.com/accuweather-forecast-api/apis/get/forecasts/v1/daily/5day/%7BlocationKey%7D">5-day</a>).

```js
  const fetchForecast = async (cityKey) => {
    await fetch(
      `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${apikey}`
                                             OR
      `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${apikey}`
    )
      .then((res) => res.json())
      .then((data) => setForecast(data))
      .catch(() => console.log("error in fetching forecast"));
  };
```

each table element from the forecast object is mapped to display information.

```js
 forecast.DailyForecasts.map((day) => {...})
               OR
 forecast.map((hour) => {...})
```
