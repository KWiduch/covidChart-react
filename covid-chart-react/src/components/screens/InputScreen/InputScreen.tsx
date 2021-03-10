import React, { useEffect, useState} from "react";
import axios from "axios";
import { COVID_API_URL } from "../../constants/apiUrl";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from '@material-ui/core/MenuItem';
// import { ptPOL } from "date-fns/locale";

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

interface ResponseDataResultObject {
  confirmed: number;
  deaths: number;
  recoverd: number;
}

interface ResponseDataResult {
  [key: string]: ResponseDataResultObject;
}

interface ResponseData{
  count: number;
  result: ResponseDataResult;
}



const InputScreen: React.FC = () => {
  const classes = useStyles();
  const [data, setData] = useState<ResponseData[] | null>(null);
  const [country, setCountry] = useState<string>("POL");
    const [selectedDate, setSelectedDate] = useState<Date | null|string>(
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

  // Make a request for a user with a given ID
  // console.log(data)

  const handleCountryChange = (event: React.ChangeEvent<{country?: string; value: unknown}>) => {
    setCountry(event.target.value as string);
  };

  const handleDateChange = (date: Date | null) => {
    console.log(date)
    setSelectedDate(date);
  };

// console.log(selectedDate)
// console.log(data)
  return (
    <>
      <h1>STATYSTKI COVID</h1>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Country</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={country}
          onChange={handleCountryChange}
        >
          <MenuItem value={"POL"}>Poland</MenuItem>
          <MenuItem value={"USA"}>United States of America</MenuItem>
          <MenuItem value={"IND"}>India</MenuItem>
        </Select>
      </FormControl>

      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/mm/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
    </MuiPickersUtilsProvider>
    <div className="inputButton"><button>Submit</button></div>
    <div className="output">
      <div className="date">{""+selectedDate}</div>
      <div className="coutry">{country}</div>
      {/* <div className="data">{data===null ? " " : data.map(d=><div>{d.result}</div>)}</div>          ????????? */}
    </div>
    </>
  );
};

export { InputScreen };
