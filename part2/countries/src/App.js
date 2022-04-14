import { useEffect, useState } from 'react';
import axios from 'axios'


const Filter = (props) =>
  <div>
    search: name: <input value={props.searchText} onChange={props.searchHandler} />
  </div>

const Country = (props) =>
  <p>
    {props.country.name.common}
    <button onClick={() => props.showHandler(props.country.name.common)} style={{ marginLeft: 10 }}>Show</button>
  </p>

const DetailedCountry = (props) => {
  const [weather, setWeather] = useState({
    main: {temp: ""},
    weather: [{description: ""}]});
  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${props.country.latlng[0]}&lon=${props.country.latlng[1]}&appid=748e65f966e8aaa075b29b42a168349a`)
      .then(res =>
        {
          console.log(res.data)
          return setWeather(res.data);
        })}, []);
  
  return(
    <div>
      <h2>{props.country.name.common} {props.country.flag}</h2>
      <p>Capital: {props.country.capital}</p>
      <div>
        <p><b>{weather.main.temp}</b></p>
        <p><b>{weather.weather[0].description}</b></p>
      </div>
    </div>
  );
}

const CountryList = (props) => {
  const filtered = props.conts
    .filter(c => c.name.common.toLowerCase().includes(props.filter)
    );

  if (props.filter === "") {
    return <div></div>
  } else if (filtered.length === 1) {
    return (
      <div>
        <DetailedCountry country={filtered[0]} />
      </div>
    )
  } else if (filtered.length > 10) {
    return (
      <p>Too many results!</p>
    )
  } else {
    return filtered.map((c) =>
      <Country key={c.name.common} country={c} showHandler={props.showHandler} />)
  }
}

function App() {

  const [conts, setConts] = useState([])
  const [search, setSearch] = useState("")

  const handleChange = (event) => {
    setSearch(event.target.value)
  }

  const handleShow = (country) => {
    setSearch(country)
  }

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/all`)
      .then(res => {
        setConts(res.data)
      })
  }, [])

  return (
    <div className="App">
      <Filter searchHandler={handleChange} searchText={search} />
      <CountryList showHandler={handleShow} conts={conts} filter={search.toLowerCase()} />
    </div>
  )
}

export default App;
