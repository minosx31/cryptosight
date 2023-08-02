import { useParams } from "react-router-dom"
import { CryptoState } from "../CryptoContext";
import { LinearProgress, Typography} from "@mui/material";
import CoinInfo from "./CoinInfo";
import { makeStyles } from "tss-react/mui";
import { numberWithCommas } from "./Carousel";
import { useGetSingleCoinQuery } from "../api/CryptoApi";

const CoinPage = () => {
  const { id } = useParams();
  const { currency } = CryptoState();
  const {data: coin, isFetching} = useGetSingleCoinQuery(id)

  const useStyles = makeStyles()((theme) => {
    return {
      container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      },
      info: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
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
        textAlign: "center",
      },
      marketData: {
        width: "100%",
        display: "flex",
        gap: "30px",
        justifyContent: "space-around",
        [theme.breakpoints.down("md")]: {
          flexDirection: "column",
          alignItems: "center"
        },
      }
    }
  })

  const { classes } = useStyles();

  if (isFetching) return <LinearProgress style={{backgroundColor: "#d4d6d9"}} />
  
  return (
    <div className={classes.container}>
      <div className={classes.info}>
        <img src={coin?.image.large} alt={coin?.name} height="180" style={{ margin:"20px" }} />
        <Typography variant="h4" className={classes.heading}>
          {coin?.name}
        </Typography>
        
        <Typography variant="subtitle1" className={classes.description}>
          <div dangerouslySetInnerHTML={{ __html: coin?.description.en.split(". ")[0] + "."}}/>
        </Typography>
        
        <div className={classes.marketData}>
          <span style={{ padding: 10, }}> 
            <Typography variant="h5" style={{fontFamily: "Montserrat"}} >
              Rank: {coin?.market_cap_rank}
            </Typography>
          </span>

          <span style={{ padding: 10, }}> 
            <Typography variant="h5" style={{fontFamily: "Montserrat"}} >
            Current Price: ${coin ? numberWithCommas(coin.market_data.current_price[currency.toLowerCase()]) : ""}{" "}{currency}
            </Typography>
          </span>

          <span style={{ padding: 10, }}> 
            <Typography variant="h5" style={{fontFamily: "Montserrat"}} >
            Market Cap: ${coin ? numberWithCommas(coin.market_data.market_cap[currency.toLowerCase()].toString().slice(0, -6)) + "M" : ""}
            </Typography>
          </span>
        </div>
      </div>

      <CoinInfo />
    </div>
  )
}
export default CoinPage