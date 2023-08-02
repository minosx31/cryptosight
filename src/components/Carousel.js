import { CryptoState } from "../CryptoContext";
import { makeStyles } from "tss-react/mui";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { useGetMarketCapQuery } from "../api/CryptoApi";
import { LinearProgress } from "@mui/material";
import { format } from "../utils/format";

const Carousel = () => {
    const useStyles = makeStyles()( () => {
        return {
            carousel: {
                height: "40%",
                display: "flex",
                alignItems: "center",
            }, 
            carouselItem: {
                display:"flex",
                flexDirection:"column",
                alignItems:"center",
                cursor:"pointer",
                textTransform: "uppercase",
                color: "white",
                margin: "15px",
                paddingBottom: "10px",
                backgroundColor: "#2a3040",
                borderRadius: "15px",
            }
        };
    })
    
    const { classes } = useStyles();

    const { currency } = CryptoState();

    const responsive = {
        0: {
            items: 2,
        },
        512: {
            items: 4,
        }
    };

    const { data: marketCap, isFetching: isFetchingMarketCap } = useGetMarketCapQuery(currency)

    if (isFetchingMarketCap) return <LinearProgress style={{backgroundColor: "#d4d6d9"}} />

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
                    <span style={{color: profit ? "#00a68c" : "#d9475a", fontWeight: 500, margin: "0.25rem"}}>
                        {profit && "+"}
                        {coin?.price_change_percentage_24h?.toFixed(2)}%
                    </span>
                </span>

                <span style={{fontSize: "20", fontWeight: 500}}>
                    ${format(coin?.current_price.toFixed(2))}
                </span>
            </Link>
        )
    })

  return (
    <div className={classes.carousel}>
        <AliceCarousel 
            mouseTracking
            touchTracking
            infinite
            autoPlayInterval={1500}
            animationDuration={1000}
            disableDotsControls
            responsive={responsive}
            items={items}
            autoPlay
        />
    </div>
  )
}
export default Carousel