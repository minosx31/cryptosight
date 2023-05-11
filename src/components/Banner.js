import { Container, Typography } from "@mui/material";
import { makeStyles } from "tss-react/mui"
import Carousel from "./Carousel";


const Banner = () => {
    const useStyles = makeStyles()( () => {
        return {
            bannerContent: {
                height: 400,
                display: "flex",
                flexDirection: "column",
                paddingTop: 25,
                justifyContent: "space-around"
            },
            tagline: {
                display: "flex",
                height: "40%",
                flexDirection: "column",
                justifyContent: "center",
                textAlign: "center"
            }
        };
    })
    
    const { classes } = useStyles();

  return (
    <div>
        <Container className={classes.bannerContent}> 
            <div className={classes.tagline}>
                <Typography
                    variant="h2"
                    style={{
                        fontWeight: "bold",
                        marginBottom: 15,
                        fontFamily: "Montserrat"
                    }}
                >
                    CryptoSight
                </Typography>

                <Typography 
                    variant="subtitle2"
                    style={{
                        color: "darkgrey",
                        textTransform: "capitalize",
                        fontFamily: "Montserrat"
                    }}
                >
                    Get updated information on your favorite crypto here!
                </Typography>
            </div>
            <Carousel />
        </Container>
    </div>
  )
}
export default Banner