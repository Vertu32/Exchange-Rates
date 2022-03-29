import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import useRequest from "./hooks/useRequest";
import RateList from "./components/RateList";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const [rates, loading, error] = useRequest(fetchRates);
  const [arrRates, setArrRates] = useState([]);

  function fetchRates() {
    return axios.get(`https://www.cbr-xml-daily.ru/daily_json.js`);
  }

  if (loading) {
    return (
      <header className="head__text">
        <h1>Идет загрузка...</h1>
      </header>
    );
  }

  if (error) {
    return (
      <header className="head__text">
        <h1>Произошла ошибка при запросе</h1>
      </header>
    );
  }
  if (rates && !arrRates.length) {
    setArrRates(Object.values(rates.Valute));
  }

  return (
    <div className="App">
      <Navbar />
      <header>
        <div className="head__text">
          <h1>Официальный курс валют на сегодня </h1>
        </div>
      </header>

      <RateList
        numCode={"Цифр. код"}
        charCode={"Букв. код"}
        value={"Курс"}
        prevValue={"Рост за сутки"}
        classList={"list__block head"}
        nominal={"Единиц"}
      ></RateList>

      {arrRates.length &&
        arrRates.map((rate) => (
          <RateList
            key={rate.ID}
            nameRu={rate.Name}
            numCode={rate.NumCode}
            charCode={rate.CharCode}
            value={Number(rate.Value).toFixed(4)}
            prevValue={Number(
              Math.round(((rate.Value - rate.Previous) / rate.Value) * 10000) /
                100
            ).toFixed(2)}
            nominal={rate.Nominal}
            prevURL={rates.PreviousURL}
            classList={"list__block"}
          ></RateList>
        ))}
      <Footer></Footer>
    </div>
  );
}

export default App;
