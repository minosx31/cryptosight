import { useState } from "react"
import { CryptoState } from "../CryptoContext";
import { CircularProgress, LinearProgress, ThemeProvider, createTheme } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { Line } from "react-chartjs-2";
import { CategoryScale, Chart, Filler, Legend, LineElement, LinearScale, PointElement, Title, Tooltip } from "chart.js";
import { useParams } from "react-router-dom";
import { chartDays } from "../utils/data";
import SelectButtons from "./SelectButtons";
import { useGetHistoricalChartQuery } from "../api/CryptoApi";

const CoinInfo = () => {
  const { id } = useParams();
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();
  const { data: historicalChart, isFetching } = useGetHistoricalChartQuery({
    id, currency, days
  })

  const darkTheme = createTheme({
    palette: {
        mode: "dark"
    }
});

const useStyles = makeStyles()((theme)=> {
  return {
    container: {
      width: "90%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      padding: 40,
      [theme.breakpoints.down("md")]: {
        width: "100%",
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
      }
    }
  }
})

const { classes } = useStyles();

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
)

  if (isFetching) return <LinearProgress style={{backgroundColor: "#d4d6d9"}} />

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {
          !historicalChart ? (
            <CircularProgress style={{ color: "#d4d6d9" }} size={250} thickness={1} />
          ) : (
          <>
            <Line 
              data={{
                labels: historicalChart.prices.map((coin) => {
                  let date = new Date(coin[0]);
                  let time = date.getHours() > 12 
                    ? `${date.getHours()-12}:${date.getMinutes()} PM` 
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                  
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [{
                  data: historicalChart.prices.map((coin) => coin[1]),
                  label: `Price ( Past ${days} Days ) in ${currency}`,
                  fill: {
                    target: "origin",
                    above: "rgba(93, 149, 179, 0.1)",
                  }
                }],
              }} 
              options={{
                elements: {
                  point: {
                    radius: "0",
                  },
                  line: {
                    borderColor: "#5d95b3",
                    borderWidth: 1.5,
                  }
                },
                scales: {
                  y: {
                    grid: {
                      color: "rgb(235,238,241,0.2)",
                    }
                  },
                  x: {
                    grid: {
                      display: false,
                    }
                  }
                },
                plugins: {
                  legend: {
                    onClick: null,
                  },
                  decimation: {
                    enabled: true,
                  }
                },
                spanGaps: true,
              }}
            />
          
            <div style={{
              display: "flex",
              marginTop: 20,
              justifyContent: "space-around",
              width: "100%"
            }}>
              {chartDays.map((day) => (
                <SelectButtons key={day.value} onClick={() => setDays(day.value)} selected={day.value === days}>
                  {day.label}
                </SelectButtons>
              ))}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  )}
export default CoinInfo