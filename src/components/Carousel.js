import { CryptoState } from "../CryptoContext";
import { makeStyles } from "tss-react/mui";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { useGetMarketCapQuery } from "../api/CryptoApi";
import { LinearProgress } from "@mui/material";

// https://stackoverflow.com/questions/2901102/how-to-format-a-number-with-commas-as-thousands-separators
export function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {
    const useStyles = makeStyles()( () => {
        return {
            carousel: {
                height: "50%",
                display: "flex",
                alignItems: "center"
            }, 
            carouselItem: {
                display:"flex",
                flexDirection:"column",
                alignItems:"center",
                cursor:"pointer",
                textTransform: "uppercase",
                color: "white"
            }
        };
    })
    
    const { classes } = useStyles();

    const { currency, symbol } = CryptoState();

    const responsive = {
        0: {
            items: 2,
        },
        512: {
            items: 4,
        }
    };

    const { data: marketCap, isFetching } = useGetMarketCapQuery(currency)

    if (isFetching) return <LinearProgress style={{backgroundColor: "gold"}} />

    const items = marketCap.map((coin) => {
        let profit = coin.price_change_percentage_24h >= 0;
        return (
            <Link 
            className={classes.carouselItem}
            to={`/coins/${coin.id}`}>
                <img src={coin?.image}
                alt={coin.name}
                height="70"
                style={{padding: 10}} 
            />
                <span>
                    {coin?.symbol + " "}
                    <span style={{color: profit ? "green" : "red", fontWeight: 500, margin: "0.25rem"}}>
                        {profit && "+"}
                        {coin?.price_change_percentage_24h?.toFixed(2)}%
                    </span>
                </span>

                <span style={{fontSize: "20", fontWeight: 500}}>
                    {symbol + numberWithCommas(coin?.current_price.toFixed(2))}
                </span>
            </Link>
        )
    })

  return (
    <div className={classes.carousel}>
        <AliceCarousel 
        mouseTracking 
        infinite
        autoPlayInterval={1500}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
        />
    </div>
  )
}
export default Carousel