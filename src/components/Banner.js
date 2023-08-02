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
                justifyContent: "space-evenly"
            },
            tagline: {
                display: "flex",
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
                    m={0}
                    variant="h4"
                    style={{
                        margin: "0",
                        color: "darkgrey",
                        textTransform: "capitalize",
                        fontFamily: "Montserrat",
                    }}
                >
                    Check the prices of your favorite crypto here!
                </Typography>
            </div>

            <Carousel />
        </Container>
    </div>
  )
}
export default Banner