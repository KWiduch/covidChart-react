import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Line } from "react-chartjs-2";
import "./Output.css";

interface ResponseDataResultObject {
  confirmed: number;
  deaths: number;
  recovered: number;
}

interface ResponseDataResult {
  [key: string]: ResponseDataResultObject;
}

interface ResponseData {
  count: number;
  result: ResponseDataResult;
}

interface Props {
  selectedDate: Date | null;
  country: string;
  data: ResponseData | null;
}

const OutputScreen: React.FC<Props> = ({ selectedDate, country, data }) => {
  console.log(selectedDate);

  var dateFormat = require("dateformat");
  var formatedDate = dateFormat(selectedDate, "isoDate");
  const [newDate, setNewDate] = useState(formatedDate);

  useEffect(() => {
    setNewDate(formatedDate);
  }, [selectedDate]);

  const months = Object.entries(data?.result || {}).filter((res) =>
    res[0].includes(newDate.slice(0, 7))
  );
  const xaxis = [months.map((month) => month[0])];
  const yaxisConfirmed = [months.map((month) => month[1].confirmed)];
  const yaxisDeaths = [months.map((month) => month[1].deaths)];
  const yaxisRecovered = [months.map((month) => month[1].recovered)];

  return (
    <>
      <h1>STATYSTKI COVID Z MIESIĄCA {formatedDate.slice(5, 7)}</h1>
      <div className="output">
        <h4>Szczegółowe statystki</h4>
        <div className="date">Statystyki z dnia: {formatedDate}</div>
        <div className="coutry">Wybrany kraj: {country}</div>
        <div className="data1">
          liczba zachorowań: {data?.result[`${newDate}`].confirmed}
        </div>
        <div className="data2">
          liczba zgonów: {data?.result[`${newDate}`].deaths}
        </div>
        <div className="data3">
          liczba wyzdrowiałych: {data?.result[`${newDate}`].recovered}
        </div>
      </div>
      <div className="switcher">
        <Link to="/">
          <button>Input Screen</button>
        </Link>
      </div>
      <Line
        data={{
          labels: xaxis[0],
          datasets: [
            {
              label: "Deaths",
              backgroundColor: "transparent",
              borderColor: "rgb(255, 99, 132)",
              data: yaxisDeaths[0],
            },
            {
              label: "Confirmed",
              backgroundColor: "transparent",
              borderColor: "rgb(255, 206, 86)",
              data: yaxisConfirmed[0],
            },
            {
              label: "Recoverd",
              backgroundColor: "transparent",
              borderColor: "rgb(54, 162, 235)",
              data: yaxisRecovered[0],
            },
          ],
        }}
        height={200}
        width={400}
        options={{
          backgroundColor: "white",

          legend: {
            labels: {
              // This more specific font property overrides the global property
              fontColor: "white",
              defaultFontColor: "white",
            },
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        }}
      />
    </>
  );
};
//
export { OutputScreen };
