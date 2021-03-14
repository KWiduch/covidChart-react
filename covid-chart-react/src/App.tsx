import React,{useState,useEffect} from 'react';
import axios from "axios";
import { COVID_API_URL } from './components/constants/apiUrl';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {InputScreen} from './components/screens/InputScreen/InputScreen'
import {OutputScreen} from './components/screens/OutputScreen/OutputScreen'
import 'date-fns';


interface ResponseDataResultObject {
  confirmed: number;
  deaths: number;
  recovered: number;
}

interface ResponseDataResult {
  [key: string]: ResponseDataResultObject;
}

interface ResponseData{
  count: number;
  result: ResponseDataResult;
}


const App:React.FC=()=> {
  const [data, setData] = useState<ResponseData | null>(null);
  const [country, setCountry] = useState<string>("POL");
    const [selectedDate, setSelectedDate] = useState<Date | null>(
    new Date(),
  );
    useEffect(() => {
    axios
      .get(`${COVID_API_URL}/${country}`)
      .then(function (response) {
        // handle success
        setData(response.data);
        // console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, [country]);

    const handleCountryChange = (event: React.ChangeEvent<{country?: string; value: unknown}>) => {
    setCountry(event.target.value as string);
  };

  const handleDateChange = (date: Date | null) => {
    console.log(date)
    setSelectedDate(date);
  };
  console.log(data)
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <InputScreen handleCountryChange={handleCountryChange} handleDateChange={handleDateChange}country={country}selectedDate={selectedDate}  />
          </Route>
          <Route path="/output">
            <OutputScreen country={country} selectedDate={selectedDate} data={data} />
          </Route>
        </Switch>      
      </Router>
      
    </div>
  );
}

export default App;
