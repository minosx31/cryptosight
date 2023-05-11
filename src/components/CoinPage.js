import { useParams } from "react-router-dom"
import { CryptoState } from "../CryptoContext";
import { SingleCoin } from "../config/api";
import { LinearProgress, Typography} from "@mui/material";
import CoinInfo from "./CoinInfo";
import { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "tss-react/mui";
import { numberWithCommas } from "./Carousel";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const data = await axios.get(SingleCoin(id), {withCredentials:false});
    setCoin(data)
  };

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line
  }, [])

  console.log(coin)

  const useStyles = makeStyles()((theme) => {
    return {
      container: {
        display: "flex",
        [theme.breakpoints.down("md")]: {
          flexDirection: "column",
          alignItems: "center"
        }
      },

      sidebar: {
        width: "30%",
        [theme.breakpoints.down("md")]: {
          width: "100%"
        },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 25,
        borderRight: "2px solid"
      },

      heading: {
        fontWeight: "bold",
        marginBottom: 20,
        fontFamily: "Montserrat"
      },

      description: {
        width: "100%",
        fontFamily: "Montserrat",
        padding: 25,
        textAlign: "justify"
      },

      marketData: {
        alignSelf: "start",
        padding: 25,
        width: "100%",
        [theme.breakpoints.down("md")]: {
          display: "flex",
          justifyContent: "space-around"
        },
        [theme.breakpoints.down("sm")]: {
          flexDirection: "column",
          alignItems: "center"
        },
        [theme.breakpoints.down("xs")]: {
          alignItems: "start"
        },
      }
    }
    
  })

  const { classes } = useStyles();

  if (!coin) return <LinearProgress style={{backgroundColor: "gold"}} />
  
  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img src={coin?.data.image.large} alt={coin?.data.name} height="200" style={{ marginBottom: 20}} />
        <Typography variant="h3" className={classes.heading}>
          {coin?.data.name}
        </Typography>
        
        <Typography variant="subtitle1" className={classes.description}>
          <div dangerouslySetInnerHTML={{ __html: coin?.data.description.en.split(". ")[0] + "."}}/>
        </Typography>
        
        <div className={classes.marketData}>
          <span style={{ display: "flex" }}> 
            <Typography variant="h5" style={{fontFamily: "Montserrat"}} >
              Rank: {coin?.data.market_cap_rank}
            </Typography>
          </span>

          <span style={{ display: "flex" }}> 
            <Typography variant="h5" style={{fontFamily: "Montserrat"}} >
            Current Price: {symbol}{" "}{numberWithCommas(coin?.data.market_data.current_price[currency.toLowerCase()])}
            </Typography>
          </span>

          <span style={{ display: "flex" }}> 
            <Typography variant="h5" style={{fontFamily: "Montserrat"}} >
            Market Cap: {symbol}{" "}{numberWithCommas(coin?.data.market_data.market_cap[currency.toLowerCase()].toString().slice(0, -6))}M
            </Typography>
          </span>
        </div>
        
      </div>

      {/* chart */}
      <CoinInfo coin={coin} />
    </div>
  )
}
export default CoinPage