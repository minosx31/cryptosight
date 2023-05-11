import axios from "axios";
import { useEffect, useState } from "react"
import { HistoricalChart } from "../config/api";
import { CryptoState } from "../CryptoContext";
import { CircularProgress, LinearProgress, ThemeProvider, createTheme } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { Line } from "react-chartjs-2";
import { CategoryScale, Chart, Filler, Legend, LineElement, LinearScale, PointElement, Title, Tooltip } from "chart.js";
import { useParams } from "react-router-dom";
import { chartDays } from "../config/data";
import SelectButtons from "./SelectButtons";

const CoinInfo = ({ coin }) => {
  const { id } = useParams();
  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();

  const fetchHistoricalData = async () => {
    const { data } = await axios.get(HistoricalChart(id, days, currency), {withCredentials:false});
    setHistoricalData(data.prices)
  }

  useEffect(() => {
    fetchHistoricalData();
    // eslint-disable-next-line
  } , [currency, days])

  const darkTheme = createTheme({
    palette: {
        mode: "dark"
    }
});

const useStyles = makeStyles()((theme)=> {
  return {
    container: {
      width: "75%",
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

console.log(historicalData)

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

if (!coin) return <LinearProgress style={{backgroundColor: "gold"}} />

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {
          !historicalData ? (
            <CircularProgress style={{ color: "gold" }} size={250} thickness={1} />
          ) : (
          <>
          
            <Line data={{
              labels: historicalData.map((coin) => {
                let date = new Date(coin[0]);
                let time = 
                date.getHours() > 12 
                ? `${date.getHours()-12}:${date.getMinutes()} PM` 
                : `${date.getHours()}:${date.getMinutes()} AM`;
                
                return days === 1 ? time : date.toLocaleDateString();
              }),

              datasets: [{
                data:historicalData.map((coin) => coin[1]),
                label: `Price ( Past ${days} Days ) in ${currency}`,
                borderColor: "teal"
              }],
            }} 
            options={{
              elements: {
                point: {
                  radius: 1
                }
              }
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