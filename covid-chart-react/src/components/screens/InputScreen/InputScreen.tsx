import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import "./InputScreen.css";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(2),
      minWidth: 230,
      justifyContent: "center",
      border: "1px solid white",
      minHeight: "180px",
      padding: "20px",
      borderRadius: "20px",
      background: "white",
    },
  })
);

interface Props {
  handleCountryChange: (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
    child: React.ReactNode
  ) => void;
  handleDateChange: (
    date: MaterialUiPickersDate,
    value?: string | null | undefined
  ) => void;
  selectedDate: Date | null;
  country: string;
}

const InputScreen: React.FC<Props> = ({
  handleCountryChange,
  handleDateChange,
  selectedDate,
  country,
}) => {
  const classes = useStyles();
  return (
    <>
      <div className="container">
        <h1>WPROWADŹ DANE</h1>
        <FormControl className={classes.formControl}>
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
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="yyyy-MM-dd"
              margin="normal"
              id="date-picker-inline"
              label="Date"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </FormControl>
        <div className="switcher">
          <Link to="/output">
            <button>Output Screen</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export { InputScreen };
